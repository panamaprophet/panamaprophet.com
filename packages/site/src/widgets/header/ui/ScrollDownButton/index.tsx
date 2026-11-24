import { Icon } from '@/shared/ui/Icon';

interface Props {
    target: string,
}

export const ScrollDownButton = ({ target }: Props) => (
    <a className="absolute bottom-7.5" href={`#${target}`}>
        <Icon type="arrow" size={48} />
    </a>
);
