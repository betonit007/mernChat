import React, { useReducer, createContext } from 'react';
import axios from '../../axios';
import chatReducer from './chatReducer'
import { ADD_CHAT, GET_CHATS, GET_ROOMS, SET_CHATS_LOADING, FILTER_ROOMS, ADD_ROOM, INITIATE_ROOM } from '../types'

export const ChatContext = createContext()

const ChatState = props => {
    const initialState = {
        currentRoom: null,
        currentRoomChats: null,
        allRooms: null,
        filteredRooms: null,
        chatsLoading: false,
        roomsLoading: true
    }

    const [state, dispatch] = useReducer(chatReducer, initialState);

    
    const { currentRoomChats, currentRoom, allRooms, chatsLoading, roomsLoading, filteredRooms } = state

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

    const sendMessage = async (message) => {
        
        if (!state.currentRoom.id) return
        console.log("send message")
        try {
            await axios.post(`/api/chats/new`, {
                message: message,
                name: "Timmay",
                roomId: state.currentRoom,
                userId: "5f7ca75da0a692399d12607e"
            })

        } catch (error) {
            console.log(error)
        }
    }

    const sendRoom = async room => {

        try {

            const newRoom = { name: room }
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
        
        dispatch({
            type: ADD_ROOM,
            payload: roomInfo
        })
    }

    const addMessage = newChat => {
        console.log(newChat)
        if (!state.currentRoom || newChat.roomId !== state.currentRoom.id) return
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

    return (
        <ChatContext.Provider
            value={{
                currentRoom,
                currentRoomChats,
                allRooms,
                filteredRooms,
                chatsLoading,
                roomsLoading,
                getChats,
                getRooms,
                setChatsLoading,
                sendMessage,
                addMessage,
                dynamicFilter,
                sendRoom,
                addRoom
            }}
        >
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatState;

