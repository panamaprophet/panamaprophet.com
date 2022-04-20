import { Track, Section } from '../types';


export const getPlaylists = (data: Section[]) => data.map(item => item.playlist).filter((item): item is string => Boolean(item));

export const isInPlaylist = (playlist: string) => (track: Track) => track.playlist === playlist;
