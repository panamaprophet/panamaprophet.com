import Image from 'next/image'
import Player from '../Player';
import styles from './Section.module.css';


const IMAGE_DEFAULTS = {
    width: 420,
    height: 420,
};


const Section = ({
    image,
    title,
    player,
    description,
}) => (
    <section>
        {image && <Image
            src={image}
            alt={title}
            layout="fixed"
            width={IMAGE_DEFAULTS.width}
            height={IMAGE_DEFAULTS.height}
        />}

        <h2 className={styles.title}>{title}</h2>

        {player && <Player {...player} />}

        {description && description.map((line, index) => <p key={index}>{line}</p>)}
    </section>
);


export default Section;