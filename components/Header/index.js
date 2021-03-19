import Icon from '../Icon';
import styles from './Header.module.css';


const ScrollDown = () => (
    <div className={styles.scrollDown} onClick={() => { console.log('nothing yet')}}>
        <Icon type="arrow" />
    </div>
);


const Header = () => (
    <section className={styles.container}>
        <svg className={styles.logo} viewBox="0 0 710 195" version="1.1" preserveAspectRatio="xMidYMid meet">
            <text x="0" y="150" textAnchor="start" className={styles.logoText}>PROPHET P</text>
        </svg>
        <ScrollDown />
    </section>
);

export default Header;