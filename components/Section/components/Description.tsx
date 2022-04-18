export const Description = ({ text = [] }: { text: string[] }) => (
    <>
        {text.map((line, index) => <p key={index}>{line}</p>)}
    </>
);
