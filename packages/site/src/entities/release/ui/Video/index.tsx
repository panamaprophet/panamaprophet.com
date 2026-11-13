import './index.css';

interface Props {
    src: string,
    title: string,
    width?: number,
    height?: number,
}

export const Video = ({ src, title, width = 420, height = 420 }: Props) => (
    <div className="video">
        <iframe src={src} title={title} width={width} height={height} loading="lazy" allowFullScreen />
    </div>
);
