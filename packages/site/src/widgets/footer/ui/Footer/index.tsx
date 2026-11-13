import { Links } from '@/shared/ui/Links';
import { links } from '../../model';
import './index.css';

export const Footer = () => (
    <footer className="footer">
        <Links urls={links} size={32} />
    </footer>
);
