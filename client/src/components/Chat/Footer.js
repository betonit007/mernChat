import React, { useState, useContext } from 'react'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import { ChatContext } from '../../context/chat/chatContext'

const Footer = () => {

    const { sendMessage, currentRoom } = useContext(ChatContext)

    const [ message, setMessage] = useState("")

    const handleMessage = e => {
        e.preventDefault()
        sendMessage(message)
        setMessage("")
    }

    return (
        <div className='chat__footer'>
           <InsertEmoticonIcon />
           <form onSubmit={handleMessage}>
               <input 
                 placeholder="Type a message..." 
                 type="text"
                 value={message}
                 onChange={e=>setMessage(e.target.value)}
                 disabled={!currentRoom}
                />
               <button type="submit">
                   Send a message
               </button>
           </form>
           <MicIcon />
        </div>
    )
}

export default Footer
