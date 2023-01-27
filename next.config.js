module.exports = {
    distDir: 'build',
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.eu-west-1.amazonaws.com',
                port: '',
                pathname: '/panamaprophet.com/**',
            },
        ],
    },
};
