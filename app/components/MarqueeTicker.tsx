export default function MarqueeTicker() {
    const items = [
        '🚀 Web Developer',
        '🎮 Game Developer',
        '⚡ Scripter',
        '🤖 Bot Developer',
        '✨ UI/UX Enthusiast',
        '💻 Full-Stack',
        '🎨 Creative Coder',
        '🔥 Open Source',
    ];

    const repeated = [...items, ...items];

    return (
        <div className="relative py-6 overflow-hidden" style={{ zIndex: 2 }}>
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, var(--bg-primary), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(270deg, var(--bg-primary), transparent)' }} />

            {/* Top line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)' }} />

            {/* Scrolling text */}
            <div className="flex marquee-track">
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        className="mx-8 text-sm font-medium uppercase tracking-[0.25em] whitespace-nowrap"
                        style={{ color: 'rgba(255,255,255,0.15)' }}
                    >
                        {item}
                    </span>
                ))}
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)' }} />
        </div>
    );
}
