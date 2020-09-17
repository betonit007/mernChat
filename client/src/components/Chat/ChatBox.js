import React from 'react'

const ChatBox = ({ reciever=false }) => {
    return (
        <p className={`chat__message ${reciever && "chat__reciever"}`}>
            <span className="chat__name">Tim</span>
                    This is a message
            <span className="chat__timestamp">
                {new Date().toUTCString()}
            </span>
        </p>

    )
}

export default ChatBox
