import { ReactNode } from 'react';
import styles from './index.module.css';


export const Row = ({ children, direction = 'straight' }: { children: ReactNode, direction?: 'straight' | 'reverse' }) => (
    <div className={[
        styles.row,
        styles[`row_direction-${direction}`]
    ].join(' ')}>{children}</div>
);

export const Column = ({ children, style = {} }: { children: ReactNode, style?: React.CSSProperties }) => {
    return <div className={styles.column} style={style}>{children}</div>;
};
