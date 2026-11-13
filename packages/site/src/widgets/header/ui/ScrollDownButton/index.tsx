import { Icon } from '@/shared/ui/Icon';
import './index.css';

interface Props {
    target: string,
}

export const ScrollDownButton = ({ target }: Props) => (
    <a className="scroll-down-button" href={`#${target}`}>
        <Icon type="arrow" size={48} />
    </a>
);
