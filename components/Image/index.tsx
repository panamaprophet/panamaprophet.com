import NextImage from 'next/image';


interface Props {
    src: string,
    alt?: string,
    width?: number,
    height?: number,
}


export const Image = ({ src, alt = '', width = 420, height = 420 }: Props) => (
    <div>
        <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="fixed"
        />
    </div>
);
