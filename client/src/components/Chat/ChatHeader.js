import React, { useContext } from 'react'
// import { Avatar, IconButton } from '@material-ui/core'
// import { SearchOutlined } from '@material-ui/icons';
import { ChatContext } from '../../context/chat/chatContext'


const ChatHeader = () => {

    const { currentRoom, currentRoomChats } = useContext(ChatContext)

    const LastChatEllipsis = chatObj => {
        const string = chatObj[chatObj.length - 1]?.message
        if (!string) return
        if (string.length > 25) return `${string.substring(0, 25)}...`
        return string
    }
    
    return (
        <div className="chat__header">
            {/* <Avatar /> */}
            <div className="chat__headerInfo">
                {currentRoom?.name && (
                    <>
                        <h3>{currentRoom.name}</h3>
                        <p>{currentRoomChats && LastChatEllipsis(currentRoomChats)}</p>
                    </>
                )}
            </div>

            <div className="chat__headerRight">
                {/* <IconButton>
                    <SearchOutlined />
                </IconButton> */}
            </div>
        </div>
    )
}

export default ChatHeader
