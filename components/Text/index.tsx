import styles from './index.module.css';


export const Title = ({ text }: { text: string }) => <h2 className={styles.title}>{text}</h2>;

export const Description = ({ text }: { text: string | string[] }) => {
    const source = Array.isArray(text) ? text : [text];

    return (
        <div className={styles.root}>
            {source.map(line => <p key={line}>{line}</p>)}
        </div>
    );
};
