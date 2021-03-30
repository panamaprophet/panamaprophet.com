import {Track, TrackState, Section} from '../types';


export const getAlignByIndex = (index: number) => index % 2 ? 'right' : 'left';

export const getTracksByPlaylist = (tracks: Track[], playlist: string) => tracks
    .filter(track => track.playlist === playlist);

export const getPlaylists = (data: Section[]) => data
    .map(item => item.playlist)
    .filter((item): item is string => Boolean(item));

export const mapTracksToState = (tracks: Track[], state: TrackState[]) => tracks
    .map(track => state.find(item => item.id === track.id))
    .filter((item): item is TrackState => Boolean(item));
