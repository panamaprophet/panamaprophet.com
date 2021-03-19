/**
 * @todo: change fb to instagram
 */
const Links = ({
    facebook,
    vkontakte,
    youtube,
    soundcloud,
 }) => (
    <ul className="linkup">
        {facebook && <li className="linkup__item">
            <a href={facebook} target="_blank">
            <span className="icon icon--facebook"></span>
            </a>
        </li>}

        {vkontakte && <li className="linkup__item">
            <a href={vkontakte} target="_blank">
            <span className="icon icon--vkontakte"></span>
            </a>
        </li>}

        {youtube && <li className="linkup__item">
            <a href={youtube} target="_blank">
            <span className="icon icon--youtube"></span>
            </a>
        </li>}

        {soundcloud && <li className="linkup__item">
            <a href={soundcloud} target="_blank">
            <span className="icon icon--soundcloud"></span>
            </a>
        </li>}
    </ul>
);

export default Links;