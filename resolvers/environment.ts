type Environment = {
    clientId: string,
    clientSecret: string,
};


export const getEnv = async (): Promise<Environment> => ({
    clientId: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
});
