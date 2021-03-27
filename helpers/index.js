export const createInitialState =
    tracks => Object.keys(tracks).reduce((result, key) => ([
        ...result,
        ...tracks[key],
    ]), []);
