import clsx from 'clsx';
import Image from 'next/image';

export default function TeaserPic({ children, ...props }) {
    return (
        <Image {...props}
            alt="A Demon Mask"
            palceholder="empty"
            className={clsx([
                "w-full",
                "align-middle", 
                "shadow-inner", 
                "drop-shadow-md",
                "max-w-[200px]"
            ])} />
    )
}