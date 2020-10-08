import React from 'react'

const ChatBox = ({chatInfo: { received, message, name, timestamp }}) => {
    return (
        <p className={`chat__message ${received && "chat__reciever"}`}>
            <span className="chat__name">{name}</span>
                    {message}
            <span className="chat__timestamp">
                {/* {new Date().toUTCString()} */}
                {timestamp}
            </span>
        </p>

    )
}

export default ChatBox
