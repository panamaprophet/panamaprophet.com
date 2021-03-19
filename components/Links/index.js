import Icon from '../Icon';
import styles from './Links.module.css';

/**
 * @todo: change fb to instagram
 */
const Links = ({
    facebook,
    vkontakte,
    youtube,
    soundcloud,
 }) => (
    <ul className={styles.container}>
        {facebook && <li className={styles.link}>
            <a href={facebook} target="_blank">
                <Icon type="facebook" />
            </a>
        </li>}

        {vkontakte && <li className={styles.link}>
            <a href={vkontakte} target="_blank">
                <Icon type="vkontakte" />
            </a>
        </li>}

        {youtube && <li className={styles.link}>
            <a href={youtube} target="_blank">
                <Icon type="youtube" />
            </a>
        </li>}

        {soundcloud && <li className={styles.link}>
            <a href={soundcloud} target="_blank">
                <Icon type="soundcloud" />
            </a>
        </li>}
    </ul>
);

export default Links;