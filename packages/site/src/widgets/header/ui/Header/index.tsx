import { Logo } from '../Logo';
import { ScrollDownButton } from '../ScrollDownButton';
import './index.css';

export const Header = ({ scrollTarget }: { scrollTarget: string }) => (
    <header className="header">
        <Logo />
        <ScrollDownButton target={scrollTarget} />
    </header>
);
