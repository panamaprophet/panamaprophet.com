import { ReactNode } from 'react';
import styles from './index.module.css';


export const Footer = ({ children }: { children: ReactNode }) => (
    <footer className={styles.root}>
        {children}
    </footer>
);
