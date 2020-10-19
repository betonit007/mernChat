import React from 'react'
import { formatRelative } from "date-fns";

const ChatBox = ({ chatInfo: { message, name, timestamp, userId }, user }) => {

    const userChat = userId === user._id || false

    return (
        <div className={`chat__message ${userChat && "chat__reciever"}`}>
            <span className="chat__name">{!userChat && name}</span>
            <p>{message}</p>
            <span className='chat__timestamp' style={userChat ? { right: 0 } : { left: 0 }}>
                {/* {new Date().toUTCString()} */}
                {timestamp && formatRelative(new Date(timestamp), new Date())}
            </span>
        </div>

    )
}

export default ChatBox
