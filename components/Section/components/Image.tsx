import NextImage from 'next/image';
import styles from '../Section.module.css';


interface Props {
    src: string,
    alt?: string,
    width?: number,
    height?: number,
}


export const Image = ({ src, alt = '', width = 420, height = 420 }: Props) => (
    <div className={styles.mediaContainer}>
        <NextImage
            className={styles.image}
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    </div>
);
