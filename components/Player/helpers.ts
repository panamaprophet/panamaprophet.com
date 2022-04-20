const SPLIT_TITLE_REGEXP = /[·・]/;


export const formatDuration = (duration: number) => {
    const minutes = duration / 1000 / 60 | 0;
    const seconds = duration / 1000 % 60 | 0;
    const secondsWithPadding = seconds.toString().padStart(2, '0');

    return `${minutes}:${secondsWithPadding}`;
};

export const formatTitle = (title: string) => {
    const [result] = title.split(SPLIT_TITLE_REGEXP);

    return result;
};

export const getTrackNumberByIndex = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
};
