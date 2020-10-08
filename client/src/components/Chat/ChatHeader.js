import React, { useContext } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, SpaRounded } from '@material-ui/icons';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ChatContext } from '../../context/chat/chatContext'


const ChatHeader = () => {

    const { currentRoom, currentRoomChats } = useContext(ChatContext)


    return (
        <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
                {currentRoom?.name && (
                    <>
                        <h3>{currentRoom.name}</h3>
                <p>{currentRoomChats[currentRoomChats.length -1]?.message}</p>
                    </>
                )}
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
    )
}

export default ChatHeader
