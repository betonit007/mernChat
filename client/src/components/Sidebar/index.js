import React from 'react'
import SidebarHeader from './SidebarComponents/SidebarHeader'
import SidebarRoomSearch from './SidebarComponents/SidebarRoomSearch'
import './styles.css'

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <SidebarHeader />
            <SidebarRoomSearch/>
        </div>
    )
}

export default Sidebar
