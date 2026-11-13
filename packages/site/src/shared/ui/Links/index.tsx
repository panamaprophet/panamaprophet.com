import { Icon, isIconType } from '../Icon';
import './index.css';

interface Props {
    urls: Record<string, string>,
    size?: number,
}

export const Links = ({ urls, size = 32 }: Props) => (
    <div className="links">
        {Object.entries(urls).map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="links__link">
                {isIconType(name) ? <Icon type={name} size={size} /> : name}
            </a>
        ))}
    </div>
);
