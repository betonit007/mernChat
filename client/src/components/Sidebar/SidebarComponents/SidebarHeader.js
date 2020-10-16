import React, { useContext, useState } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { AuthContext } from '../../../context/auth/authContext'
import UserAccount from './UserAccount';

const SidebarHeader = () => {

    const { user, logout, token, updateUser } = useContext(AuthContext)
    const [ accountMenu, toggleAccountMenu ] = useState(false)
    return (
        <div className="sidebar__header">
            <IconButton onClick={() => toggleAccountMenu(!accountMenu)}>
                <Avatar src={user && user.photoUrl} />
            </IconButton>
            
               <UserAccount
                    user={user}
                    logout={logout}
                    accountMenu={accountMenu}
                    toggleAccountMenu={toggleAccountMenu}
                    updateUser={updateUser}
                    token={token}
                />
            
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
