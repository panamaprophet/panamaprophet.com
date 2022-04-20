import { TrackState, Section } from '../types';


export const getPlaylists = (data: Section[]) => data.map(item => item.playlist).filter((item): item is string => Boolean(item));

export const getTracksFromStateByPlaylist = (playlist: string, state: TrackState[]) => state.filter(item => item.playlist === playlist)
