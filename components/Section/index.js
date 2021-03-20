import Image from 'next/image'
import Player from '../Player';
import styles from './Section.module.css';


const IMAGE_DEFAULTS = {
    width: 420,
    height: 420,
};


const Section = ({
    image,
    video,
    title,
    player,
    description,
}) => (
    <section>
        <div className={styles.info}>
            {image && (<div className={styles.image}>
                    <Image
                        src={image}
                        alt={title}
                        layout="fixed"
                        width={IMAGE_DEFAULTS.width}
                        height={IMAGE_DEFAULTS.height}
                    />
            </div>)}

            {video && (<div className={styles.video}>
                <Player
                    {...video}
                    width={IMAGE_DEFAULTS.width}
                    height={IMAGE_DEFAULTS.height}
                />
            </div>)}

            <div className={styles.description}>
                {title && <h2 className={styles.title}>{title}</h2>}

                {description && description.map((line, index) => <p key={index}>{line}</p>)}
            </div>
        </div>

        {player && (<div className={styles.player}>
            <Player {...player} />
        </div>)}
    </section>
);


export default Section;