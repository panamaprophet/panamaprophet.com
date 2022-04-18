import { ReactNode } from 'react';
import Links from '../Links';
import Sections from './Sections';
import styles from './Section.module.css';


type Props = {
    title: string,
    description: string[],
    links?: { [k: string]: string },
    image?: string,
    video?: string,
    align: 'left' | 'right',
    children?: ReactNode,
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
            {image && <Sections.Image src={image} alt={title} />}
            {video && <Sections.Video src={video} />}
            <Sections.Text title={title}>
                {description && description.map((line, index) => <p key={index}>{line}</p>)}
                {links && <Links layout="compact" urls={links} />}
            </Sections.Text>
        </div>
        {children}
    </section>
);


export default Section;
