type Environment = {
    clientId: string,
    clientSecret: string,
    revalidationInterval: number,
};


export const getEnv = async (): Promise<Environment> => ({
    clientId: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
    revalidationInterval: Number(process.env.REVALIDATION_INTERVAL),
});
