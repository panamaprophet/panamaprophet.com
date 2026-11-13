import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Page } from '@/pages/home';
import './index.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('#root element is missing');
}

createRoot(container).render(
    <StrictMode>
        <Page />
    </StrictMode>,
);
