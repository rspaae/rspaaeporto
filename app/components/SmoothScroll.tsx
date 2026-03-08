'use client';

import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    // Removed Lenis — native browser scrolling is lighter and works well with modern browsers.
    // The CSS scroll-behavior: smooth in globals.css handles smooth anchor scrolling.
    return <>{children}</>;
}
