export async function generateUniqueUsername(desired: string, client: any) {
    let finalUsername = desired.replace(/[^a-zA-Z0-9_]/g,"");
    let attempt = 0;

    while (await client.user.findUnique({where: {username: finalUsername }})) {
        finalUsername = `${desired}${Math.floor(1000 + Math.random() * 9000)}`;
        attempt ++;

        if (attempt >= 10 ) throw new Error ("Could not generate unique username");
    }

    return finalUsername;
}