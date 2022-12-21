import clsx from 'clsx';

export default function Conditional({ value }) {
    if (value === null) {
        return <span className={clsx([
                "blur",
                "text-aurora-300", 
                "font-bold"
        ])}>?????</span>
    }
    return <span className={clsx([
        "text-aurora-300", 
        "font-bold"
    ])}>{value}</span>
}