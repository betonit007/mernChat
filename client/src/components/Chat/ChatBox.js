import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import { formatRelative } from "date-fns";
import randomColor from '../../utils/randomColor';

const ChatBox = ({ chatInfo: { message, name, timestamp, userId, pic, photo }, user }) => {

    const [picSize, toggleSize] = useState(true)

    const userChat = userId === user?._id || false

    return (

        <div className={`message__container ${userChat ? "user_chat" : ""} ${!message ? "no_message" : ""}`}>
            {!userChat &&
                (photo
                    ? <Avatar src={photo} />
                    : <Avatar style={{ backgroundColor: randomColor(name) }}>{name.split('')[0]}</Avatar>
                )
            }
            <div>
                <div className='chat__name' >{!userChat && name}</div>
                {pic.length ? pic.map(pic =>
                    <img
                        onClick={() => toggleSize(!picSize)}
                        className={`${userChat && "push-imageRight"} ${picSize ? "small" : "expand"}`}
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
                <div className="chat__timestamp" style={{marginLeft: userChat ? 'auto' : "5px"}}>
                    {/* {new Date().toUTCString()} */}
                    {timestamp && formatRelative(new Date(timestamp), new Date())}
                </div>
            </div>
        </div>
    )
}

export default ChatBox
