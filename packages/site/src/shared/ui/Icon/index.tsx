import apple from './images/apple.svg';
import arrow from './images/arrow.svg';
import instagram from './images/instagram.svg';
import soundcloud from './images/soundcloud.svg';
import spotify from './images/spotify.svg';
import vkontakte from './images/vk.svg';
import youtubeMusic from './images/youtube-music.svg';
import youtube from './images/youtube.svg';

import './index.css';

const ICONS = {
    apple,
    arrow,
    instagram,
    soundcloud,
    spotify,
    vkontakte,
    youtube,
    'youtube-music': youtubeMusic,
} satisfies Record<string, string>;

export type IconType = keyof typeof ICONS;

export const isIconType = (value: string): value is IconType => Object.hasOwn(ICONS, value);

interface Props {
    type: IconType,
    size?: number,
}

export const Icon = ({ type, size = 32 }: Props) => (
    <img className="icon" src={ICONS[type]} width={size} height={size} alt={type} />
);
