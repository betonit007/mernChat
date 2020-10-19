import React, { useState, useContext } from 'react'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import { ChatContext } from '../../context/chat/chatContext'
import { AuthContext } from '../../context/auth/authContext'
import { emojis, Emoji } from './Emojis/EmojiBox'

const Footer = () => {

    const { sendMessage, currentRoom } = useContext(ChatContext)
    const { user } = useContext(AuthContext)

    const [message, setMessage] = useState("")
    const [showEmoji, toggleShowEmoji] = useState(false)

    const handleMessage = e => {
        e.preventDefault()
        if (!message) return
        sendMessage({ message, user })
        setMessage("")
    }

    return (
        <div className="chatFooter__container">
            <div className='chat__footer'>
                <button
                    className="emoji-display-button"
                    onClick={() => toggleShowEmoji(!showEmoji)}
                    disabled={!currentRoom}
                >
                    <InsertEmoticonIcon />
                </button>
                <form onSubmit={handleMessage}>
                    <input
                        placeholder={!currentRoom ? "Select a room to enter message" : "Enter a message..."}
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        disabled={!currentRoom}
                    />
                    <button type="submit">
                        Send a message
               </button>
                </form>
                <MicIcon />
            </div>
            <div className={`chat__emoji-container ${showEmoji ? 'show-emojis' : 'shrink-emojis'}`}>
                <div className="chat__emoji-body">
                    {emojis.map((emoji, i) =>
                        <Emoji
                            key={i}
                            label={emoji.label}
                            symbol={emoji.symbol}
                            message={message}
                            setMessage={setMessage}
                        />

                    )}
                </div>
            </div>
        </div>
    )
}

export default Footer
