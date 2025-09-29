import { OAuth2Client } from "google-auth-library";
import client from "@metaverse/db";

export const googleAuthService = async (idToken: string): Promise<void> => {
    // 1. Verify token
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID});
    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub) throw new Error("Invalid Google token");

    // 2. Find User by Google ID
    let user = await client.user.findUnique({ where: {provider_providerId: {provider: "GOOGLE", providerId: payload.sub}}})

    // 3. If not found, find by email (in case user previously registered by email);
    if (!user) {
        user = await client.user.findUnique({ where: {email: payload.email} });
        if (user) {
            user = await client.user.update({
                where: {
                    email: payload.email
                },
                data: {
                    provider: "GOOGLE",
                    providerId: payload.sub
                } 
            });

        } else {
            user = await client.user.create({
                data: {
                    email: payload.email,
                    provider: "GOOGLE",
                    providerId: payload.sub,
                    username: "",
                    displayName: payload.name || "",
                    profileImageUrl: payload.picture || "",
                    isProfileCompleted: false,
                    bio: "",
                }
            });
        }
    }

    // 4. Update last login timestamp
    await client.user.update({ where: {id: user.id}, data: {lastLoginAt: new Date() } });

}