import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import client from "@metaverse/db";
import { generateJWT, createUser } from "@metaverse/utils";


// Google auth service

export const googleAuthService = async (idToken: string) => {
    try {
    // 1. Verify the Google token.
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if(!payload?.email || !payload?.sub) throw new Error("Invalid token");

    // 2. Find user by Google Provider Id
    let user = await client.user.findUnique({ where: {
        provider_providerId : {
            provider: "GOOGLE",
            providerId: payload.sub,
        }
    }
});
    // 3. if not found, look up by email.
    if (!user) {
        user = await client.user.findUnique({ where: { email: payload.email}});
        
        if (user) {
            user = await client.user.update({ 
                where: { email: payload.email},
                data: {
                    provider: "GOOGLE",
                    providerId: payload.sub,
                }
            });
        } else {
            // Create a new user
            let baseUsername = payload.name || (payload.email ? payload.email.split("@")[0] : "user") as string;
            user = await createUser({
                email: payload.email,
                provider: "GOOGLE",
                providerId: payload.sub,
                baseUsername,
                displayName: payload.name || baseUsername,
                profileImageUrl: payload.picture || "",
                bannerImageUrl: "",
                bio: "",
                client,
            });
        };
    };
        if (!user) throw new Error ("User is not created");
        
        // 4. update the user
        user = await client.user.update({ 
            where: { id: user.id},
            data: { lastLoginAt: new Date()}
        });

        // 5. Generate Jwt token;
        const token = generateJWT(user.id);

        return {
            user: {
            id: user.id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            profileImageUrl: user.profileImageUrl,
            bannerImageUrl: user.bannerImageUrl,
            bio: user.bio,       
            isProfileCompleted: user.isProfileCompleted
            },
            token,
            success: true,
            message: "Google login Successfully!"   
        }
    } catch (error: any) {
        throw new Error(error.message || "Google OAuth failed");   
}
   
}

// Github auth service

export const githubAuthService = async (code: string) => {
    try {
    // 1. Exchange code for access token
    const {data: tokenRes} = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,    
            code
        },
        { headers: { Accept: "application/json"} }
    );

    if (tokenRes.error) throw new Error (tokenRes.error_description || tokenRes.error);

    const accessToken = tokenRes.access_token;
    if (!accessToken) throw new Error("Failed to get Github access token")
    
    // 2. Fetch profile and emails
    const { data: profile } = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }); 

    const { data: emails } = await axios.get("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const primaryEmail = emails.find((e: any) => e.primary && e.verified)?.email;
    if (!primaryEmail) throw new Error("No verified primary email found in GitHub account.");

    // 3. Upsert user by provider ID or email.
    const githubId = profile.id.toString();
    let user = await client.user.findUnique({
        where: { provider_providerId: { provider: "GITHUB", providerId: githubId } }
    });

    if(!user) {
        user = await client.user.findUnique({ where: { email: primaryEmail } });
        if (user) {
            user = await client.user.update({
                where: { email: primaryEmail},
                data: {
                    provider: "GITHUB",
                    providerId: githubId,
                }
            });
        } else {
            const baseUsername = profile.login || (primaryEmail ? primaryEmail.split("@")[0] : "user") as string;
            user = await createUser({
                    email: primaryEmail,
                    baseUsername,
                    provider: "GITHUB",
                    providerId: githubId,
                    displayName: profile.name || baseUsername,
                    profileImageUrl: profile.avatar_url,
                    bannerImageUrl: "",
                    bio: "",
                    client
            });
        }
    }

    if(!user) throw new Error("User is not created");

    // 4. Update last login
    await client.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
    });

    // Generate JWT
    const token = generateJWT(user.id) ;

     return {
    user: {
            id: user.id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            profileImageUrl: user.profileImageUrl,
            bannerImageUrl: user.bannerImageUrl,
            bio: user.bio,
            isProfileCompleted: user.isProfileCompleted
        },
        token,
        success: true,
        message: "Github login sucessfully"
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
        const errorMsg =
            error.response?.data?.error_description ||
            error.response?.data?.error ||
            error.message;
        throw new Error(`GitHub API error: ${errorMsg}`);
  } else {
        throw new Error(error.message || "GitHub OAuth failed");
    }
}
};