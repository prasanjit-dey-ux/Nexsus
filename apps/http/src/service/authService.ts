import { OAuth2Client } from "google-auth-library";
import client from "@metaverse/db";
import { generateJWT } from "@metaverse/utils";

export const googleAuthService = async (idToken: string) => {
    // 1. Verify token
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if(!payload?.email || !payload?.sub) throw new Error("Invalid Google token");
    // 2. Find User by Google ID
    let user = await client.user.findUnique({
        where: { provider_providerId:{
            provider: "GOOGLE",
            providerId: payload.sub
        }}
    });
    // 3. If not found, find by email (in case user previously registered by email);
    if(!user) {
        user = await client.user.findUnique({ where: { email: payload.email } });
        if(user) {
            user = await client.user.update({
                where: { email: payload.email },
                data: {
                    provider: "GOOGLE",
                    providerId: payload.sub
                }
            });
        } else {
            // Create new user
            user = await client.user.create({
                data: {
                    email: payload.email,
                    provider: "GOOGLE",
                    providerId: payload.sub,
                    username: "",
                    displayName: payload.name || "",
                    profileImageUrl: payload.picture || "",
                    bannerImageUrl: "",
                    isProfileCompleted: false,
                    bio: "",
                }
            });
        }
    }
    // 4. Update last login timestamp
    await client.user.update({ 
        where: { id: user.id},
        data: { lastLoginAt: new Date()}  
    });
    // 5. Issue JWT
    const token = generateJWT(user.id);
    
    return {
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            profileImageUrl: user.profileImageUrl,
            bannerImageUrl: user.bannerImageUrl,
            bio: user.bio,       
            isProfileCompleted: user.isProfileCompleted
        },
        token,
        success: true,
        message: "Google login Successful",
    };
}
