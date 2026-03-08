'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const isHoveredRef = useRef(false);
    const rafRef = useRef<number>(0);

    const createRipple = useCallback((x: number, y: number) => {
        if (!containerRef.current) return;
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            border: 1.5px solid rgba(0, 245, 255, 0.5);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
        `;
        containerRef.current.appendChild(ripple);

        let size = 0;
        let opacity = 0.6;
        const expandRipple = () => {
            size += 5;
            opacity -= 0.025;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.opacity = `${Math.max(0, opacity)}`;
            if (opacity > 0) {
                requestAnimationFrame(expandRipple);
            } else {
                ripple.remove();
            }
        };
        requestAnimationFrame(expandRipple);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleClick = (e: MouseEvent) => {
            createRipple(e.clientX, e.clientY);
        };

        // Use event delegation instead of MutationObserver
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .interactive, [role="button"]')) {
                isHoveredRef.current = true;
            }
        };
        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .interactive, [role="button"]')) {
                isHoveredRef.current = false;
            }
        };

        // Simple ring follow — single rAF loop, no trail DOM
        const animate = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const hovered = isHoveredRef.current;

            ringPosRef.current.x += (mx - ringPosRef.current.x) * 0.25;
            ringPosRef.current.y += (my - ringPosRef.current.y) * 0.25;

            if (ringRef.current) {
                const scale = hovered ? 2 : 1;
                ringRef.current.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px) scale(${scale})`;
                ringRef.current.style.borderColor = hovered
                    ? 'rgba(0, 245, 255, 0.7)'
                    : 'rgba(0, 245, 255, 0.25)';
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px) scale(${hovered ? 0 : 1})`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleClick);
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(rafRef.current);
        };
    }, [createRipple]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none"
                style={{
                    border: '1.5px solid rgba(0, 245, 255, 0.25)',
                    transition: 'border-color 0.2s',
                    mixBlendMode: 'screen',
                    willChange: 'transform',
                }}
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                    background: 'var(--neon-cyan)',
                    boxShadow: '0 0 6px rgba(0, 245, 255, 0.8)',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
