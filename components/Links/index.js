import Icon from '../Icon';
import styles from './Links.module.css';


const Links = (props) => {
    const keys = Object.keys(props);

    return (
        <div className={styles.root}>
            {keys.map(key => (
                <a key={key} href={props[key]} target="_blank">
                    <Icon type={key} />
                </a>
            ))}
        </div>
    );
}

export default Links;
