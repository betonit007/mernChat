import React, { useEffect, useContext, useState} from 'react'
import { ChatContext } from './context/chat/chatContext'
import { AuthContext } from './context/auth/authContext'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Modal from './components/Modal'
import LoginRegister from './components/LoginRegister'
import Pusher from 'pusher-js'

const App = () => {

    const { addMessage, currentRoom, addRoom } = useContext(ChatContext)
    const { isAuthenticated } = useContext(AuthContext)
    console.log(isAuthenticated)
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
          cluster: 'mt1'
        });
    
        const channel = pusher.subscribe('messages'); //pusher.subscribe("messages") must match pusher.trigger on backend end server to watch for changes.
        channel.bind('inserted', newChat => {
            console.log('messages', newChat)
           addMessage(newChat)

        });

        const channel2 = pusher.subscribe('rooms'); //pusher.subscribe("messages") must match pusher.trigger on backend end server to watch for changes.
        channel2.bind('inserted', newRoom => {
            console.log(newRoom)
           addRoom(newRoom)

        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe(); //clean so multiple new listeners are not created.
            channel2.unbind_all();
            channel2.unsubscribe();
        }
    }, [currentRoom])

    return (
        <div className='app'>
            <div className="app-body">
                {!isAuthenticated && (
                  <Modal >
                    <LoginRegister />
                  </Modal>
                ) }
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default App
