import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBox from './ChatBox'
import Footer from './Footer'

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
                <ChatBox />
                <ChatBox reciever={true}/>
                <ChatBox />
            </div>
            <Footer />
        </div>
    )
}

export default Chat
