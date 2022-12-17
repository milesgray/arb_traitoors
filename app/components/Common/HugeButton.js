import clsx from 'clsx';

export default function HugeImportantButton({ children, ...props }) {
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
                "from-yellow-400",
                "to-amber-400",
                "hover:from-amber-400",
                "hover:to-yellow-400",
                "shadow-yellow-400",
                "glow-sm",
                "hover:glow-lg"
            ])}>
            {children}
        </button>
    )
}