import NextImage from 'next/image';
import styles from './index.module.css';

interface Props {
    src: string,
    alt?: string,
    width?: number,
    height?: number,
}


export const Image = ({ src, alt = '' }: Props) => (
    <div className={styles.root}>
        <NextImage src={src} alt={alt} fill />
    </div>
);
