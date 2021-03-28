import Image from 'next/image'
import styles from './Section.module.css';


const IMAGE_DEFAULTS = {
    width: 420,
    height: 420,
};


const Section = ({
    image,
    title,
    video,
    description,
    align = 'left',
    children,
}) => (
    <section className={[
        styles.root,
        styles[align],
    ].join(' ')}>
        <div className={styles.info}>
            {image && (<div className={styles.mediaContainer}>
                    <Image
                        className={styles.image}
                        src={image}
                        alt={title}
                        layout="fixed"
                        width={IMAGE_DEFAULTS.width}
                        height={IMAGE_DEFAULTS.height}
                    />
            </div>)}

            {video && (<div className={styles.mediaContainer}>
                <iframe
                    src={video}
                    width={IMAGE_DEFAULTS.width}
                    height={IMAGE_DEFAULTS.height}
                    frameBorder="0"
                />
            </div>)}

            <div className={styles.description}>
                {title && <h2 className={styles.title}>{title}</h2>}

                {description && description.map((line, index) => <p key={index}>{line}</p>)}
            </div>
        </div>

        {children}
    </section>
);


export default Section;
