import clsx from 'clsx';
import Image from 'next/image';

export default function PreviewImage({ src }) {
    return (
        <Image
            alt="A Demon Mask"
            palceholder="empty"
            src={src}
            className={clsx([
                "w-full", 
                "align-middle", 
                "shadow-inner", 
                "drop-shadow-md", 
                "max-w-[200px]"
            ])}
        />
    )
}