import React from 'react'
import { Avatar } from '@material-ui/core'
import { formatRelative } from "date-fns";

const SidebarChat = ({ name, id, getChats, lastUpdated, creatorInfo }) => {

    return (
        <div className='sidebarChat' onClick={()=>getChats({ id, name })}>
            <Avatar src={creatorInfo && creatorInfo.photoUrl}/>
            <div className="sidebarChat__info">
 
                <h2>{name}</h2>
                    {lastUpdated && <small>{`Updated ${formatRelative(new Date(lastUpdated), new Date())}`}</small>}
            </div>
            
        </div>
    )
}

export default SidebarChat
