import { ReactNode } from 'react';
import styles from './index.module.css';


export const Header = ({ children }: { children: ReactNode }) => (
    <section className={styles.root}>
        {children}
    </section>
);
