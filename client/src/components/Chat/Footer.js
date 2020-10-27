import React, { useState, useContext, useRef } from 'react'
import { InsertEmoticon, Mic } from "@material-ui/icons"
import { ChatContext } from '../../context/chat/chatContext'
import { AuthContext } from '../../context/auth/authContext'
import { ToastContext } from '../../context/toast/toastContext'
import { emojis, Emoji } from './Emojis/EmojiBox'
import ImageContainer from './ImageContainer'
import ChatAddImage from './ChatAddImage'

const Footer = () => {

    const { sendMessage, currentRoom } = useContext(ChatContext)
    const { setToast } = useContext(ToastContext)
    const { user } = useContext(AuthContext)

    const [input, setInput] = useState({
        message: "",
        pic: []
    })
    const [showEmoji, toggleShowEmoji] = useState(false)

    const messageInputRef = useRef(null)

    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        messageInputRef.current.focus()
    }

    const handleMessage = e => {
        e.preventDefault()
        if (!input.message && input.pic.length === 0) return
        sendMessage({ input, user })
        setInput({
            message: '',
            pic: []
        })
    }

    const handleEmoji = emojiTextCombined => {
        setInput({
            ...input,
            message: emojiTextCombined
        })
        messageInputRef.current.focus()

    }

    return (
        <div
            onClick={!currentRoom ? () => setToast('warning', "Please select a room..") : undefined}
            className="chatFooter__container"
        >
            <ImageContainer input={input} />
            <div className='chat__footer'>
                <button
                    className="emoji-display-button"
                    onClick={() => toggleShowEmoji(!showEmoji)}
                    disabled={!currentRoom}
                >
                    <InsertEmoticon titleAccess="Add Emoji" />
                </button>
                <form onSubmit={handleMessage}>
                    <input
                        placeholder={!currentRoom ? "Select a room to enter message" : "Enter a message..."}
                        type="text"
                        name="message"
                        value={input.message}
                        onChange={e => handleInput(e)}
                        ref={messageInputRef}
                        disabled={!currentRoom}
                    />
                    <button type="submit">
                        Send a message
               </button>
                </form>
                <ChatAddImage currentRoom={currentRoom} setInput={setInput} input={input} />
                {/* <Mic /> */}
            </div>
            <div className={`chat__emoji-container ${showEmoji ? 'show-emojis' : 'shrink-emojis'}`}>
                <div className="chat__emoji-body">
                    {emojis.map((emoji, i) =>
                        <Emoji
                            key={i}
                            label={emoji.label}
                            symbol={emoji.symbol}
                            message={input.message}
                            handleEmoji={handleEmoji}
                        />

                    )}
                </div>
            </div>
        </div>
    )
}

export default Footer
