import Links from '../Links';
import styles from './Footer.module.css';


type Props = {
    links: Record<string, string>,
};


const Footer = ({links}: Props) => (
    <footer className={styles.root}>
        {links && <Links {...links} />}
    </footer>
);


export default Footer;
