type Environment = {
    clientId: string,
    clientSecret: string,
    revalidationInterval: number,
};


export const getEnv = async (): Promise<Environment> => ({
    clientId: String(process.env.clientId),
    clientSecret: String(process.env.clientSecret),
    revalidationInterval: Number(process.env.revalidationInterval),
});
