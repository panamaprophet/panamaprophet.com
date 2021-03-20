import Icon from '../Icon';
import styles from './Header.module.css';


const ScrollDown = ({ target = null }) => (
    <a className={styles.scrollDown} href={target && `#${target}`} >
        <Icon type="arrow" />
    </a>
);


const Header = ({ scrollTarget = null }) => (
    <section className={styles.container}>
        <svg className={styles.logo} viewBox="0 0 710 195" version="1.1" preserveAspectRatio="xMidYMid meet">
            <text x="0" y="150" textAnchor="start" className={styles.logoText}>PROPHET P</text>
        </svg>
        <ScrollDown target={scrollTarget} />
    </section>
);

export default Header;