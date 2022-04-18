import { ReactNode } from 'react';
import styles from '../Section.module.css';


interface TextSectionProps {
    title?: string,
    children: ReactNode,
}


export const TextSection = ({ title = '', children }: TextSectionProps) => (
    <div className={styles.description}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
    </div>
);
