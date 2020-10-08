import React from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';

const SidebarHeader = () => {
    return (
        <div className="sidebar__header">
            <Avatar src="https://theflydev.com/static/media/portrait.8cbe8126.jpg" />
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
