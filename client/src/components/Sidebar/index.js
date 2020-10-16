import React, { useState } from 'react'
import SidebarHeader from './SidebarComponents/SidebarHeader'
import SidebarRoomSearch from './SidebarComponents/SidebarRoomSearch'
import { IconButton } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

import './styles.css'

const Sidebar = () => {

    const [ sidebar, toggleSidebar ] = useState(true)
    console.log('SIDEBAR RENDERED*******************************')
    return (
        
        <div className={`sidebar ${sidebar ? 'fadeIn' : 'fadeOut'}`} >
            <IconButton className='sidebar__toggle' onClick={() => toggleSidebar(!sidebar)}>
                <CodeIcon />
            </IconButton>
            <SidebarHeader />
            <SidebarRoomSearch />
        </div>
    )
}

export default Sidebar
