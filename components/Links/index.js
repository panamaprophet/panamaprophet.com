import Icon from '../Icon';
import styles from './Links.module.css';


const Links = ({
    instagram,
    vkontakte,
    youtube,
    soundcloud,
 }) => (
    <div className={styles.container}>
        {soundcloud && <a href={soundcloud} target="_blank">
            <Icon type="soundcloud" />
        </a>}

        {instagram && <a href={instagram} target="_blank">
            <Icon type="instagram" />
        </a>}

        {vkontakte && <a href={vkontakte} target="_blank">
            <Icon type="vkontakte" />
        </a>}

        {youtube && <a href={youtube} target="_blank">
            <Icon type="youtube" />
        </a>}
    </div>
);

export default Links;