import Links from '../Links';


const Footer = () => (
    <footer>
        <form action="#" method="post" className="subscription">
            <input type="email" className="subscription__email" placeholder="E-mail" />
            <button type="submit" className="subscription__submit">Подписаться</button>
            <p className="subscription__description">
                Чтобы первым узнавать о новой музыке, событиях и предстоящих мероприятиях, никакого спама!
            </p>
        </form>

        <hr className="block__separator" />

        <Links
            facebook="//facebook.com/panamaprophet"
            vkontakte="//vk.com/reggae.addict"
            youtube="//youtube.com/c/panamaprophet"
            soundcloud="//soundcloud.com/panamaprophet"
        />
    </footer>
);

export default Footer;