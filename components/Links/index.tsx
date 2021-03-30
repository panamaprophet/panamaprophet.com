import Icon from '../Icon';
import styles from './Links.module.css';
import type {IconType} from '../Icon';


type Props = {
    urls: Record<string, string>,
};


const Links = ({urls}: Props) => {
    const keys = Object.keys(urls);

    return (
        <div className={styles.root}>
            {keys.map(key => (
                <a key={key} href={urls[key]} target="_blank">
                    <Icon type={key as IconType} />
                </a>
            ))}
        </div>
    );
}

export default Links;
