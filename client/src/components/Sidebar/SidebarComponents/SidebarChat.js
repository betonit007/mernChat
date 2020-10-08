import React from 'react'
import { Avatar } from '@material-ui/core'

const SidebarChat = ({ name, id, getChats }) => {

    return (
        <div className='sidebarChat' onClick={()=>getChats({ id, name })}>
            <Avatar />
            <div className="sidebarChat__info">
 
                <h2>{name}</h2>
                <p>This is the last message</p>
            </div>
            
        </div>
    )
}

export default SidebarChat
