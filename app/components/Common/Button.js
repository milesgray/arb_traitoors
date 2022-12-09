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
                "text-slate-600",
                "bg-gradient-to-b",
                "from-red-400",
                "to-rose-400",
                "hover:from-rose-400",
                "hover:to-red-400",
                "shadow-red-700",
                "glow-sm",
                "hover:glow-lg"
            ])}>
            {children}
        </button>
    )
}