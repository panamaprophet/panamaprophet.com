import Links from '../Links';
import styles from './Footer.module.css';


type Props = {
    links: { [key: string]: string },
};


const Footer = ({ links }: Props) => (
    <footer className={styles.root}>
        <Links urls={links} />
    </footer>
);


export default Footer;
