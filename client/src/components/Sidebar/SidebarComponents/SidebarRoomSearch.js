import React, { useContext, useEffect, useState } from 'react'
import { CircularProgress, IconButton } from '@material-ui/core';
import { SearchOutlined, AddCircleOutline } from "@material-ui/icons"
import SidebarChat from './SidebarChat';
import { ChatContext } from '../../../context/chat/chatContext'
import { AuthContext } from '../../../context/auth/authContext'


const SidebarRoomSearch = () => {

    const { getRooms, filteredRooms, allRooms, roomsLoading, getChats, dynamicFilter, sendRoom } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [userInput, setUserInput] = useState("")

    useEffect(() => {
        getRooms()
    }, [])

    const handleInput = e => {
        setUserInput(e.target.value)
        dynamicFilter(e.target.value)
        console.log(console.log(filteredRooms.length))
    }

    const handleRoomAdd = e => {
        e.preventDefault()
        if (filteredRooms.length !== 0) return
        sendRoom({ userInput, user })
        setUserInput("")
    }

    return (
        <>
            <div className="sidebar__search">
                <form onSubmit={handleRoomAdd} className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input
                        type="text"
                        placeholder='Search or start new chat'
                        value={userInput}
                        onChange={e => handleInput(e)}
                    />
                    {
                        (filteredRooms?.length === 0) &&
                        <IconButton type="submit" >
                            <AddCircleOutline />
                        </IconButton>
                    }
                </form>
            </div>
            <div className="sidebar__chats">
                {(allRooms && filteredRooms.length === 0) &&
                    <h3 className="sidebar__noRooms">
                        Press
                         <IconButton >
                            <AddCircleOutline />
                        </IconButton>to add room
                    </h3>}
                {filteredRooms ?
                    filteredRooms.map(room => <SidebarChat
                        key={room._id}
                        creatorInfo={room.creatorInfo}
                        getChats={getChats}
                        id={room._id}
                        lastUpdated={room.lastUpdated}
                        name={room.name}
                    />
                    )
                    :
                    <div className='sidebar__spinner'>
                        <CircularProgress style={{ color: 'aqua' }} />
                    </div>
                }
            </div>
        </>
    )
}

export default SidebarRoomSearch
