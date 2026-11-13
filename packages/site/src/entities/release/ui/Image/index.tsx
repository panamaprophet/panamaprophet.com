import './index.css';

interface Props {
    src: string,
    alt?: string,
}

export const Image = ({ src, alt = '' }: Props) => (
    <div className="image">
        <img className="image__img" src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
);
