import clsx from 'clsx';

export function SmallImportantButton({ children, ...props }) {
    return (
        <button
            {...props}
            className={clsx([
                "mb-1",
                "py-2",
                "px-3",
                "font-bold",
                "font-mono",
                "text-xl",
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

export function SmallImportantDisabledButton({ children, ...props }) {
    return (
        <button
            {...props}
            className={clsx([
                "mb-1",
                "py-2",
                "px-3",
                "font-bold",
                "font-mono",
                "text-xl",
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