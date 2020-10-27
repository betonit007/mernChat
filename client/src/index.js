import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import ChatState from './context/chat/chatContext'
import AuthState from './context/auth/authContext'
import ToastState from './context/toast/toastContext'
import './styles.css'

ReactDOM.render(
    <ToastState>
        <AuthState>
            <ChatState>
                <App />
            </ChatState>
        </AuthState>
    </ToastState >
    , document.getElementById('root')

)