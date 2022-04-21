import Icon, { isIconType } from '../Icon';
import styles from './index.module.css';


type Props = {
    size?: number,
    urls: { [key: string]: string },
};


export const Links = ({ size = 32, urls }: Props) => {
    const keys = Object.keys(urls);

    return (
        <div className={styles.root}>
            {keys.map(key => (
                <a key={key} href={urls[key]} target="_blank" rel="noreferrer" className={styles.link}>
                    {isIconType(key) ? <Icon type={key} width={size} height={size} /> : key}
                </a>
            ))}
        </div>
    );
};
