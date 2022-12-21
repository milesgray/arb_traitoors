import clsx from 'clsx';
import Image from 'next/image';

export function PositionableImage({src, className}){ 
    return (
        <Image
            alt="A Demon Mask"
            src={src}
            className={clsx([
                "z-2", 
                "w-full", 
                "align-middle",
                "rounded", 
                "absolute", 
                "shadow-inner", 
                "drop-shadow", 
                className
            ])}                
        />
    )
}

export function PreviewImage({ src }) {
    return (
        <Image
            alt="A Demon Mask"
            palceholder="empty"
            src={src}
            className={clsx([
                "z-2", 
                "w-full", 
                "align-middle", 
                "shadow-inner", 
                "drop-shadow-md", 
                "max-w-[200px]"
            ])}
        />
    )
}

export default {
    PreviewImage,
    PositionableImage
}