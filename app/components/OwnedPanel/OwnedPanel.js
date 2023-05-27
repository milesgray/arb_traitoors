import clsx from 'clsx';
import FlipCard from '../Cards/FlipCard';

export default function OwnedPanel({
    metadata,
}) {
    console.log(metadata);
    return (    
        <ul className={clsx([
            "grid",
            "grid-cols-2",
            "md:grid-cols-4",
            "lg:grid-cols-6",
            "xl:grid-cols-8",
            "gap-4px",
            "p-4",
            "overflow-y-scroll",
            "h-[148px]",
            "md:h-[300px]",
            "lg:h-[350px]",
            "xl:h-[400px]"
        ])}>
            {metadata.map((m) => {
                if (m.tokenId === 0) return
                return (
                    <li className={clsx([
                        "text-red-900",
                        "antialiased",
                        "text-center",
                        "bg-neutral-500",
                        "glow-sm",
                        "shadow-neutral-500",
                        "p-auto",
                        "m-auto",
                        "mb-8",
                        "content-center",
                        "items-center",
                        "snap-center"
                    ])}>
                        <FlipCard>
                            <img src={m.image} className="object-contain h-32" />
                        </FlipCard>
                        <a href={m.buyLink} target="_blank">
                            {m.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    )
}