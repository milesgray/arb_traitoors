import clsx from 'clsx';

export default function TextButton({children, ...props}) {
    return (
        <a {...props}
        className={clsx([
            "text-red-600", 
            "font-bold", 
            "uppercase", 
            "cursor-pointer"
        ])}>
            {children}
        </a>
    )
}