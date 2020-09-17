import React from 'react'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"

const Footer = () => {
    return (
        <div className='chat__footer'>
           <InsertEmoticonIcon />
           <form>
               <input placeholder="Type a message..." type="text"/>
               <button type="submit">
                   Send a message
               </button>
           </form>
           <MicIcon />
        </div>
    )
}

export default Footer
