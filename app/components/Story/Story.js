import React, { useState, useEffect } from 'react';

export default function Story() {
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const paragraphs = [
        "In a dark and desolate world, where the skies are choked with smog and the streets are ruled by violence and fear, a group of rebels has arisen. These rebels are known as the ArbTraitors, and they are united by their rejection of the oppressive regime that holds sway over their land.",
        "The ArbTraitors are not like other rebels. They do not fight with guns or bombs, but with the power of art. They are skilled creators who have mastered the art of demon mask-making, and they use these masks to strike fear into the hearts of their oppressors.",
        "Each ArbTraitor has their own unique demon mask, crafted with care and infused with their own style and vision. Some are sleek and elegant, while others are grotesque and terrifying. But all of them are powerful symbols of the ArbTraitors' rebellion against the forces of oppression.",
        "Now, the ArbTraitors have decided to share their masks with the world, and they are offering them as non-fungible tokens on the Arbitrum platform. Each mask is a one-of-a-kind piece of digital art, representing the soul of the ArbTraitor who created it.",
        "Join the rebellion and claim your own ArbTraitor demon mask today. Show the world that you stand with the ArbTraitors in their fight for freedom and justice."
    ];

    const transitionParagraph = () => {
        if (currentParagraph === paragraphs.length - 1) {
            setCurrentParagraph(0);
        } else {
            setCurrentParagraph(currentParagraph + 1);
        }
        const interval = setInterval(() => {
            transitionParagraph();
        }, 1000);
        return interval;
    };

    useEffect(() => {
        const interval = transitionParagraph();
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p style={{ opacity: currentParagraph === 0 ? 1 : 0 }}>{paragraphs[0]}</p>
            <p style={{ opacity: currentParagraph === 1 ? 1 : 0 }}>{paragraphs[1]}</p>
            <p style={{ opacity: currentParagraph === 2 ? 1 : 0 }}>{paragraphs[2]}</p>
            <p style={{ opacity: currentParagraph === 3 ? 1 : 0 }}>{paragraphs[3]}</p>
            <p style={{ opacity: currentParagraph === 4 ? 1 : 0 }}>{paragraphs[4]}</p>
        </div>
    );
};