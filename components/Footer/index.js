import Links from '../Links';
import styles from './Footer.module.css';


const Footer = () => (
    <footer className={styles.container}>
        <Links
            instagram="//instagram.com/panamaprophet"
            vkontakte="//vk.com/reggae.addict"
            youtube="//youtube.com/c/panamaprophet"
            soundcloud="//soundcloud.com/panamaprophet"
        />
    </footer>
);

export default Footer;