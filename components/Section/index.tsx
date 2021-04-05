import {ReactNode} from 'react';
import Image from 'next/image';
import Links from '../Links';

import styles from './Section.module.css';


type Props = {
    title: string,
    description: string[],
    links?: {[k: string]: string},
    image?: string,
    video?: string,
    align: 'left' | 'right',
    children?: ReactNode,
};


const IMAGE_DEFAULTS = {
    width: 420,
    height: 420,
};


const Section = ({
    image,
    title,
    video,
    links,
    description,
    align = 'left',
    children,
}: Props) => (
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
                        width={IMAGE_DEFAULTS.width}
                        height={IMAGE_DEFAULTS.height}
                    />
            </div>)}

            {video && (<div className={[
                styles.mediaContainer,
                styles.videoContainer,
            ].join(' ')}>
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

                {links && <Links layout="compact" urls={links} />}
            </div>
        </div>

        {children}
    </section>
);


export default Section;
