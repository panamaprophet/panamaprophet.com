import { Logo } from '../Logo';
import { ScrollDownButton } from '../ScrollDownButton';

export const Header = ({ scrollTarget }: { scrollTarget: string }) => (
    <header className="mb-25 flex min-h-screen w-full items-center justify-center px-4">
        <Logo />
        <ScrollDownButton target={scrollTarget} />
    </header>
);
