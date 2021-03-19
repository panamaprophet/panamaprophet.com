import Links from '../Links';
import styles from './Footer.module.css';


const Footer = () => (
    <footer>
        <form action="#" method="post" className={styles.subscription}>
            <input type="email" className={styles.email} placeholder="E-mail" />
            <button type="submit" className={styles.submit}>Подписаться</button>

            <p className={styles.description}>
                Чтобы первым узнавать о новой музыке, событиях и предстоящих мероприятиях, никакого спама!
            </p>
        </form>

        <hr className={styles.separator} />

        <Links
            facebook="//facebook.com/panamaprophet"
            vkontakte="//vk.com/reggae.addict"
            youtube="//youtube.com/c/panamaprophet"
            soundcloud="//soundcloud.com/panamaprophet"
        />
    </footer>
);

export default Footer;