import clsx from 'clsx';

export default function ImportantButton({ children, ...props }) {
    return (
        <button
            {...props}
            className={clsx([
                "mb-1",
                "p-1",
                "px-2",
                "font-bold",
                "font-mono",
                "text-black",
                "bg-gradient-to-b",
                "from-aurora-400",
                "to-amber-400",
                "hover:from-amber-400",
                "hover:to-aurora-400",
                "shadow-aurora-400",
                "glow-sm",
                "hover:glow-lg"
            ])}>
            {children}
        </button>
    )
}