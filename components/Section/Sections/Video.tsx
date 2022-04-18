import styles from '../Section.module.css';


interface VideoSectionProps {
    src: string,
    width?: number,
    height?: number,
}


export const VideoSection = ({ src, width = 420, height = 420 }: VideoSectionProps) => (
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
