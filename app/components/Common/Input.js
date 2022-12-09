import clsx from 'clsx';

export default function StyledInput({ children, ...props }) {
    return (
        <input {...props}
            className={clsx([
                'text-slate-200',
                'w-4/12',
                'my-4',
                'mx-1',
                'block',
                'rounded-md',
                'bg-slate-800',
                'border-transparent',
                'focus:border-gray-500',
                'focus:bg-slate-700',
                'focus:ring-0'
            ])}>
            {children}
        </input>
    )
}