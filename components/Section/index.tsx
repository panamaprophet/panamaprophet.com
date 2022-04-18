import { ReactNode } from 'react';
import Links from '../Links';
import { Text, Image, Video, Description } from './components';
import styles from './Section.module.css';


type Props = {
    title: string,
    description: string[],
    links?: { [k: string]: string },
    image?: { src: string },
    video?: { src: string },
    align: 'left' | 'right',
    children?: ReactNode,
};


const Section = (props: Props) => (
    <section className={[
        styles.root,
        styles[props.align],
    ].join(' ')}>
        <div className={styles.info}>
            {props.image && <Image {...props.image} alt={props.title} />}
            {props.video && <Video {...props.video} />}

            <Text title={props.title}>
                {props.description && <Description text={props.description} />}
                {props.links && <Links layout="compact" urls={props.links} />}
            </Text>
        </div>
        {props.children}
    </section>
);


export default Section;
