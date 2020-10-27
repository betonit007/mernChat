import React, { useContext } from 'react'
import SidebarHeader from './SidebarComponents/SidebarHeader'
import SidebarRoomSearch from './SidebarComponents/SidebarRoomSearch'
import { IconButton } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { ChatContext } from '../../context/chat/chatContext'


import './styles.css'

const Sidebar = () => {

    const { showSidebar, toggleSideBar } = useContext(ChatContext)

    return (
        
        <div className={`sidebar ${showSidebar ? 'fadeIn' : 'fadeOut'}`} >
            <IconButton className='sidebar__toggle' onClick={() => toggleSideBar(!showSidebar)}>
                <CodeIcon />
            </IconButton>
            <SidebarHeader />
            <SidebarRoomSearch />
        </div>
    )
}

export default Sidebar
