import styles from './Icon.module.css';

// @todo: switch to svg instead of font

const Icon = ({ type }) => {
    const classes = [styles.icon, styles[type]].join(' ');

    return (<span className={classes}></span>);
};

export default Icon;