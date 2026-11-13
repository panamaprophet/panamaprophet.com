import './index.css';

export const Title = ({ text }: { text: string }) => <h2 className="title">{text}</h2>;

export const Description = ({ text }: { text: string }) => (
    <div className="description">
        {text.split('\n').map(line => line.trim()).filter(Boolean).map(line => <p key={line}>{line}</p>)}
    </div>
);
