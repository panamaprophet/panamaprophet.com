export const getTrackNumberByIndex = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
};
