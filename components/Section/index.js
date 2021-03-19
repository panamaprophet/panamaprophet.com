import Image from 'next/image'
import Player from '../Player';


const Section = ({
    image,
    title,
    playerUrl,
    children,
}) => (
    <section>
        {image && <Image src={image} alt={title} layout="fixed" width={420} height={420} />}
        {playerUrl && <Player url={playerUrl} />}
        {children}
    </section>
);

export default Section;