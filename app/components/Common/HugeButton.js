import clsx from 'clsx';

export function HugeImportantButton({ children, ...props }) {
    return (
        <button
            {...props}
            className={clsx([
                "mb-1",
                "py-6",
                "px-8",
                "font-bold",
                "font-mono",
                "text-4xl",
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

export function HugeImportantDisabledButton({ children, ...props }) {
    return (
        <button
            {...props}
            className={clsx([
                "mb-1",
                "py-6",
                "px-8",
                "font-bold",
                "font-mono",
                "text-4xl",
                "opacity-50",
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