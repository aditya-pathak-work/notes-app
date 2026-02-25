import { createInertiaApp } from '@inertiajs/react'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import Layout from '@/Layout';

import "@css/main.css";

createInertiaApp({
    resolve: (name: string) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
        return pages[`./pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <Layout>
                    <App {...props} />
                </Layout>
            </StrictMode>
        )
    },
    defaults: {
        future: {
            useScriptElementForInitialPage: true,
        },
    },
});