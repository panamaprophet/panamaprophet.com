import Image from 'next/image';
import styles from '../Section.module.css';


interface ImageSectionProps {
    src: string,
    alt?: string,
    width?: number,
    height?: number,
}


export const ImageSection = ({ src, alt = '', width = 420, height = 420 }: ImageSectionProps) => (
    <div className={styles.mediaContainer}>
        <Image
            className={styles.image}
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    </div>
);
