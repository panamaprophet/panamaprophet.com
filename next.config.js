module.exports = {
    distDir: 'build',
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
