import styles from '../Section.module.css';


interface Props {
    src: string,
    width?: number,
    height?: number,
}


export const Video = ({ src, width = 420, height = 420 }: Props) => (
    <div className={[
        styles.mediaContainer,
        styles.videoContainer,
    ].join(' ')}>
        <iframe
            src={src}
            width={width}
            height={height}
            frameBorder="0"
        />
    </div>
);
