import {
    ADD_CHAT, ADD_ROOM,
    GET_ROOMS, GET_CHATS, SET_CHATS_LOADING, FILTER_ROOMS, INITIATE_ROOM, TOGGLE_SIDEBAR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CHAT:
            if (!state.currentRoom || state.currentRoom.id !== action.payload.roomId) return
            return {
                ...state,
                currentRoomChats: [...state.currentRoomChats, action.payload]
            }
        case ADD_ROOM:
            return {
                ...state,
                allRooms: [ action.payload, ...state.allRooms ],
                filteredRooms: [ action.payload, ...state.filteredRooms ]
            }
        case GET_ROOMS:
            return {
                ...state,
                allRooms: action.payload,
                filteredRooms: action.payload
            }
        case GET_CHATS:
            const keepSidebar = window.innerWidth > 650
            return {
                ...state,
                currentRoomChats: action.payload.chats.chats,
                currentRoom: action.payload.roomInfo,
                chatsLoading: false,
                showSidebar: keepSidebar
            }
        case SET_CHATS_LOADING:
            return {
                ...state,
                chatsLoading: true
            }
        case INITIATE_ROOM:
            const { _id, name, creatorInfo } = action.payload

            return {
                ...state,
                currentRoom: _id,
                currentRoomChats: [],
                allRooms: [...state.allRooms, { _id, name, creatorInfo }],
                filteredRooms: [ { _id, name, creatorInfo }, ...state.allRooms ]
            }
        case FILTER_ROOMS:
            return {
                ...state,
                filteredRooms: state.allRooms.filter(room => {
                    const regex = new RegExp(`${action.payload}`, 'gi'); //match wether upper or lower case
                    return room.name.match(regex);
                })
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: action.payload
            }
        default:
            return state
    }
}