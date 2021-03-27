import Links from '../Links';
import styles from './Footer.module.css';


const Footer = ({links}) => (
    <footer className={styles.root}>
        {links && <Links {...links} />}
    </footer>
);

export default Footer;
