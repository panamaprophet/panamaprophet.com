import { ReactNode } from 'react';
import styles from './index.module.css';


interface Props {
    title?: string,
    children: ReactNode,
}


export const Text = ({ title = '', children }: Props) => (
    <div className={styles.root}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
    </div>
);
