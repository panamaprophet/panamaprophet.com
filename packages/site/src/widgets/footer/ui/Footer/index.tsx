import { Links } from '@/shared/ui/Links';
import { links } from '../../model';

export const Footer = () => (
    <footer className="flex w-full justify-center border-t border-[#ececec] p-5.5">
        <Links urls={links} size={32} />
    </footer>
);
