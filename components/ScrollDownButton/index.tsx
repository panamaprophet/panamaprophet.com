import Icon from '../Icon';
import styles from './index.module.css';

interface Props {
    target: string,
}

export const ScrollDownButton = ({ target }: Props) => (
    <a className={styles.root} href={`#${target}`} >
        <Icon type="arrow" width={48} height={48} />
    </a>
);

