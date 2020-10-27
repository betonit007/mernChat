import React from 'react'
import { formatRelative } from "date-fns";

const ChatBox = ({ chatInfo: { message, name, timestamp, userId, pic }, user }) => {

    const userChat = userId === user?._id || false

    return (
        <div className={`chat__message ${userChat ? "chat__reciever" : ''}`}>
            {pic.length ? pic.map(pic => <img src={pic.photoUrl} key={pic.public_id} alt="" />) : null}
            {message &&
                <div>
                    <span className='chat__name' >{!userChat && name}</span>
                    <p>{message}</p>
                </div>
            }
            <span className='chat__timestamp' style={userChat ? { right: 0 } : { left: 0 }}>
                {/* {new Date().toUTCString()} */}
                {timestamp && formatRelative(new Date(timestamp), new Date())}
            </span>
        </div>
    )
}

export default ChatBox
