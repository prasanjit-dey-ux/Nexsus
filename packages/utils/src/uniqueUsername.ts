export async function generateUniqueUsername(desired: string,client:any) {
    let finalUsername = desired.replace(/[^a-zA-Z0-9_]/g, "");
    let attempt = 0;

    while (await client.user.findUnique({ where: { username: finalUsername } })) {
        finalUsername = `${desired}${Math.floor(1000 + Math.random() * 9000)}`;
        attempt ++;

        if(attempt >= 10) throw new Error("Could not generate unique username");       
    }
    return finalUsername;        
}

export async function createUser({
    email,
    baseUsername,
    provider,
    providerId,
    displayName,
    profileImageUrl,
    bannerImageUrl = "",
    bio = "",
    client
}: {
    email: string;
    baseUsername: string;
    provider: string;
    providerId: string;
    displayName?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
    bio?: string;
    client: any;
}) {
    const finalUsername = await generateUniqueUsername(baseUsername, client);
    return await client.user.create({
        data: {
            email,
            provider,
            providerId,
            username: finalUsername,
            displayName: displayName || finalUsername,
            profileImageUrl: profileImageUrl || "",
            bannerImageUrl: bannerImageUrl || "",
            isProfileCompleted: false,
            bio 
        },
    });
}