import React from 'react';

export const emojis = [
    {
        symbol: "😃",
        label: "grinning face",
        returnSymbol: () => "😃"
    },
    {
        symbol: "💋",
        label: "kiss"
    },
    {
        symbol: "👏",
        label: "clapping hands"
    },
    {
        symbol: "😜",
        label: "winking face with tongue"
    },
    {
        symbol: "💗",
        label: "heart"
    },
    {
        symbol: "😉",
        label: "winking face"
    },
    {
        symbol: "😢",
        label: "crying face"
    },
    {
        symbol: "😒",
        label: "unamused face"
    },
    {
        symbol: "🤣",
        label: "rolling on the floor laughing"
    },
    {
        symbol: "😘",
        label: "face blowing a kiss"
    },
    {
        symbol: "😍",
        label: "smiling face with heart eyes"
    },
    {
        symbol: "🤢",
        label: "nauseeted face"
    },
    {
        symbol: "🤔",
        label: "thinking face"
    },
]

export const Emoji = props => (
    <span
        onClick={()=>props.handleEmoji(props.message + props.symbol)}
        style={{cursor:"pointer"}}
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
export default Emoji;