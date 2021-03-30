import Instagram from './images/instagram.svg';
import Soundcloud from './images/soundcloud.svg';
import Vkontakte from './images/vk.svg';
import Youtube from './images/youtube.svg';
import Arrow from './images/arrow.svg';

import styles from './Icon.module.css';


export type IconType = 'arrow' | 'instagram' | 'soundcloud' | 'vkontakte' | 'youtube';

type Props = {
    type: IconType,
    width?: number,
    height?: number,
};


const TYPE_TO_ICON_MAP: Record<IconType, string> = {
    instagram: Instagram,
    soundcloud: Soundcloud,
    vkontakte: Vkontakte,
    youtube: Youtube,
    arrow: Arrow,
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

    return (<img
        className={classes}
        src={source}
        width={width}
        height={height}
    />);
};


export default Icon;
