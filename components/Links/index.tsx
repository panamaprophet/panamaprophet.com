import Icon, {isIconType} from '../Icon';
import styles from './Links.module.css';


type Props = {
    urls: {[key: string]: string},
};


const Links = ({urls}: Props) => {
    const keys = Object.keys(urls);

    return (
        <div className={styles.root}>
            {keys.map(key => (
                <a key={key} href={urls[key]} target="_blank">
                    {isIconType(key) ? <Icon type={key} /> : key}
                </a>
            ))}
        </div>
    );
}

export default Links;
