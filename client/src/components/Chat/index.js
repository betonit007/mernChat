import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import React from 'react'
import './styles.css'

const Chat = () => {
    return (
        <div className='chat'>
           <div className="chat__header">
               <Avatar />
               <div className="chat__headerInfo">
                   <h3>Room Name</h3>
                   <p>Last seen at...</p>
               </div>

               <div className="chat__headerRight">
               <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
               </div>
           </div>
            <div className="chat__body">
                <p>
                    <span className="chat__name">Tim</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Chat
