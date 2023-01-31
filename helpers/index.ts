import { Track, Section } from '../types';


export const getPlaylists = (data: Section[]) => data.map(item => item.playlist).filter((item): item is string => Boolean(item));

export const getTrackUrl = async (track: Track) => fetch(`/api/stream/${track.id}`).then(response => response.json());
