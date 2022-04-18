import Icon, { isIconType } from '../Icon';
import styles from './Links.module.css';


const DEFAULT_ICON_SIZE = {
    width: 32,
    height: 32,
};

const COMPACT_ICON_SIZE = {
    width: 16,
    height: 16,
};


type Props = {
    layout?: 'compact' | 'default',
    urls: { [key: string]: string },
};


const Links = ({ layout = 'default', urls }: Props) => {
    const isCompact = layout === 'compact';
    const iconSize = isCompact ? COMPACT_ICON_SIZE : DEFAULT_ICON_SIZE;

    const keys = Object.keys(urls);

    return (
        <div className={[
            styles.root,
            layout === 'compact' && styles.compact,
        ].join(' ')}>
            {keys.map(key => (
                <a key={key} href={urls[key]} target="_blank" rel="noreferrer" className={styles.link}>
                    {isIconType(key) ? <Icon type={key} {...iconSize} /> : key}
                </a>
            ))}
        </div>
    );
};

export default Links;
