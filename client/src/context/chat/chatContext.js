import React, { useReducer, createContext } from 'react';
import axios from '../../axios';
import chatReducer from './chatReducer'
import { ADD_CHAT, GET_CHATS, GET_ROOMS, SET_CHATS_LOADING, FILTER_ROOMS, ADD_ROOM, INITIATE_ROOM, TOGGLE_SIDEBAR } from '../types'

export const ChatContext = createContext()

const ChatState = props => {
    const initialState = {
        currentRoom: null,
        currentRoomChats: null,
        allRooms: null,
        filteredRooms: null,
        chatsLoading: false,
        roomsLoading: true,
        showSidebar: true
    }

    const [state, dispatch] = useReducer(chatReducer, initialState);

    
    const { currentRoomChats, currentRoom, allRooms, chatsLoading, roomsLoading, filteredRooms, showSidebar } = state

    const getChats = async ({id, name }) => {
        setChatsLoading()
        try {
            const { data: [chats] } = await axios.get(`api/chats/populate/${id}`)
            
            dispatch({
                type: GET_CHATS,
                payload: { chats, roomInfo : {id, name} }
            })
        } catch (error) {
            console.log(error)
        }

    }

    const getRooms = async () => {

        try {
            const allRooms = await axios.get(`/api/chats/rooms`)
            dispatch({
                type: GET_ROOMS,
                payload: allRooms.data
            })
        } catch (error) {
            console.error('GET_ROOMS failed', error)
        }

    }

    const setChatsLoading = () => {
        dispatch({
            type: SET_CHATS_LOADING
        })
    }

    
    const sendRoom = async roomInfo => {

        const { userInput, user  } = roomInfo

        try {

            const newRoom = { 
                name: userInput, 
                creatorInfo: { 
                    name: user.name, 
                    userId: user._id,
                    photoUrl: user.photoUrl && user.photoUrl
                } }
            let res = await axios.post('/api/chats/newroom', newRoom)
            dispatch({
                type: INITIATE_ROOM,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const addRoom = roomInfo => {
        console.log(roomInfo, 'room reducer')

        dispatch({
            type: ADD_ROOM,
            payload: roomInfo
        })
    }

    const sendMessage = async (messageInfo) => {
        
        if (!state.currentRoom.id) return
     
        const { user: { name, _id }, input } = messageInfo
      
        try {
            await axios.post(`/api/chats/new`, {
                message: input.message,
                name,
                pic: input.pic,
                roomId: state.currentRoom,
                userId: _id
            })

        } catch (error) {
            console.log(error)
        }
    }


    const addMessage = newChat => {
        if (!state.currentRoom) return
        
        dispatch({
            type: ADD_CHAT,
            payload: newChat
        })
    }

    const dynamicFilter = (input, whichDispatch = FILTER_ROOMS) => {
        dispatch({
            type: whichDispatch,
            payload: input
        })
    }

    const toggleSideBar = () => {
     
        dispatch({
            type: TOGGLE_SIDEBAR,
            payload: !state.showSidebar
        })
    }

    return (
        <ChatContext.Provider
            value={{
                currentRoom,
                currentRoomChats,
                allRooms,
                filteredRooms,
                chatsLoading,
                roomsLoading,
                showSidebar,
                getChats,
                getRooms,
                setChatsLoading,
                sendMessage,
                addMessage,
                dynamicFilter,
                sendRoom,
                addRoom,
                toggleSideBar
            }}
        >
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatState;

