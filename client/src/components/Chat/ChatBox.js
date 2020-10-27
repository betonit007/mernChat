import React from 'react'
import { formatRelative } from "date-fns";

const ChatBox = ({ chatInfo: { message, name, timestamp, userId, pic }, user }) => {

    const userChat = userId === user?._id || false

    return (

        <div className={`message__container ${userChat ? "user_chat" : ""} ${!message ? "no_message" : ""}`}>
            <span className='chat__name' >{!userChat && name}</span>
            {pic.length ? pic.map(pic =>
                <img
                    className={userChat && "push-imageRight"}
                    src={pic.photoUrl}
                    key={pic.public_id}
                    alt=""
                />)
                :
                null
            }
            {message &&
                <div className={`chat__message ${userChat ? "chat__reciever" : ""} `}>
                    <p>{message}</p>
                </div>
            }
            <span className="chat__timestamp" style={userChat ? { right: 0 } : { left: 0 }}>
                {/* {new Date().toUTCString()} */}
                {timestamp && formatRelative(new Date(timestamp), new Date())}
            </span>
        </div>
    )
}

export default ChatBox
