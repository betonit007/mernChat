import React, { useContext } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { AuthContext } from '../../../context/auth/authContext'

const SidebarHeader = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className="sidebar__header">
            <Avatar src={ user && user.photoUrl } />
            {
                <div className='sidebar__account'>

            </div>
}
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SidebarHeader
