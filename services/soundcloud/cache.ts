const cache = new Map();


export const cacheToken = (obj: { [k: string]: any }) => {
    Object.entries(obj).forEach(entry => cache.set(...entry));

    return obj;
};

export const getCachedToken = () => {
    if (cache.has('accessToken')) {
        return Object.fromEntries(cache);
    }

    return null;
};
