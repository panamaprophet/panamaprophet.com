const getPageDataUrl = (pageId: string) => `${process.env.AMAZON_BUCKET}/page-data/${pageId}.json`;

export const resolvePageData = (pageId: string) => {
    const url = getPageDataUrl(pageId);

    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.log('error fetching page data:', error);

            return null;
        });
};
