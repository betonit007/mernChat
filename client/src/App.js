import React, { useEffect, useContext } from 'react'
import { ChatContext } from './context/chat/chatContext'
import { AuthContext } from './context/auth/authContext'
import Toast from './components/Toast/Toast'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Modal from './components/Modal'
import LoginRegister from './components/LoginRegister'
import Pusher from 'pusher-js'

const App = () => {
  const { addMessage, currentRoom, addRoom } = useContext(ChatContext)
  const { isAuthenticated, loadUser } = useContext(AuthContext)

  useEffect(() => {
    Pusher.logToConsole = false;

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

      addRoom(newRoom)

    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe(); //clean so multiple new listeners are not created.
      channel2.unbind_all();
      channel2.unsubscribe();
    }
  }, [currentRoom])

  useEffect(() => {
    loadUser()
  }, [isAuthenticated])

  return (
    <div className='app'>
      <div className="app-body">
        <Toast />
        {!isAuthenticated && (
          <Modal >
            <LoginRegister />
          </Modal>
        )}
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App
