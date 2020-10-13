import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../context/chat/chatContext'
import { AuthContext } from '../../context/auth/authContext'
import { CircularProgress } from '@material-ui/core'
import ChatBox from './ChatBox'

const Chats = () => {
   
    const { currentRoomChats, chatsLoading } = useContext(ChatContext)
    const { user } = useContext(AuthContext)

    const bottomDiv = useRef(null)

    useEffect(() => { //scroll to bottom of message div
        if (bottomDiv.current) {
            scrollToBottom()
        }
    }, [currentRoomChats])

    const scrollToBottom = () => {
        bottomDiv.current.scrollIntoView({ behavior: "smooth" })
    }

    if (currentRoomChats?.length === 0 && !chatsLoading) {
        return (
            <div className="chat__body" >
                <h1>Please enter first chat message...</h1>
            </div>
        )
    }

    return (
        <div className="chat__body" >
            {currentRoomChats && currentRoomChats.map((chat, i) => <ChatBox key={i} chatInfo={chat} user={user}/>)}
            {(!currentRoomChats && !chatsLoading) && <h1>Please select a room</h1>}
            {chatsLoading && <div className='sidebar__spinner'><CircularProgress style={{ color: 'aqua' }} /></div>}
            <div ref={bottomDiv} />
        </div>
    )
}

export default Chats
