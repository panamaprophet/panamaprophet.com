import styles from './index.module.css';

interface Props {
    src: string,
    width?: number,
    height?: number,
}


export const Video = ({ src, width = 420, height = 420 }: Props) => (
    <div className={styles.root}>
        <iframe src={src} width={width} height={height} />
    </div>
);
