import { Icon, isIconType } from '../Icon';

interface Props {
    urls: Record<string, string>,
    size?: number,
}

export const Links = ({ urls, size = 32 }: Props) => (
    <div className="flex items-center gap-4">
        {Object.entries(urls).map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="flex opacity-60">
                {isIconType(name) ? <Icon type={name} size={size} /> : name}
            </a>
        ))}
    </div>
);
