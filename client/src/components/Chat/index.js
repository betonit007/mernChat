import React from 'react'
import Chats from './Chats'
import Footer from './Footer'
import ChatHeader from './ChatHeader'

import './styles.css'

const Chat = () => {

    return (
        <div className='chat'>
            <ChatHeader />
            <Chats />
            <Footer />
        </div>
    )
}

export default Chat
