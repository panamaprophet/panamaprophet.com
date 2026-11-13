import type { CSSProperties, ReactNode } from 'react';
import './index.css';

interface RowProps {
    children: ReactNode,
    direction?: 'straight' | 'reverse',
}

export const Row = ({ children, direction = 'straight' }: RowProps) => (
    <div className={`row row_direction-${direction}`}>{children}</div>
);

interface ColumnProps {
    children: ReactNode,
    style?: CSSProperties,
}

export const Column = ({ children, style }: ColumnProps) => (
    <div className="column" style={style}>{children}</div>
);
