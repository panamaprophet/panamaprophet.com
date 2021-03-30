import Icon from '../Icon';
import styles from './Links.module.css';
import type {IconType} from '../Icon';


const Links = (props: Record<string, string>) => {
    const keys = Object.keys(props);

    return (
        <div className={styles.root}>
            {keys.map(key => (
                <a key={key} href={props[key]} target="_blank">
                    <Icon type={key as IconType} />
                </a>
            ))}
        </div>
    );
}

export default Links;
