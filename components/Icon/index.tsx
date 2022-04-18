import Instagram from './images/instagram.svg';
import Soundcloud from './images/soundcloud.svg';
import Vkontakte from './images/vk.svg';
import Youtube from './images/youtube.svg';
import Arrow from './images/arrow.svg';
import Spotify from './images/spotify.svg';
import Apple from './images/apple.svg';
import YoutubeMusic from './images/youtube-music.svg';

import styles from './Icon.module.css';
import Image from 'next/image';


type IconType =
    | 'arrow'
    | 'instagram'
    | 'soundcloud'
    | 'vkontakte'
    | 'youtube'
    | 'spotify'
    | 'apple'
    | 'youtube-music'
    ;

type Props = {
    type: IconType,
    width?: number,
    height?: number,
};

export const isIconType = (value: any): value is IconType => value in TYPE_TO_ICON_MAP;


const TYPE_TO_ICON_MAP: { [k in IconType]: { src: string } } = {
    instagram: Instagram,
    soundcloud: Soundcloud,
    vkontakte: Vkontakte,
    youtube: Youtube,
    arrow: Arrow,
    spotify: Spotify,
    apple: Apple,
    'youtube-music': YoutubeMusic,
};


const Icon = ({
    type,
    width = 32,
    height = 32,
}: Props) => {
    const classes = [
        styles.root,
        styles[type],
    ].join(' ');

    const source = TYPE_TO_ICON_MAP[type];

    return (<Image
        className={classes}
        src={source.src}
        width={width}
        height={height}
        alt={type}
    />);
};


export default Icon;
