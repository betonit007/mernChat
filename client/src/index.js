import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import ChatState from './context/chat/chatContext'
import AuthState from './context/auth/authContext'
import './styles.css'

ReactDOM.render(
    <AuthState>
        <ChatState>
            <App />
        </ChatState>
    </AuthState>
    , document.getElementById('root')

)