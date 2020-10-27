import { v4 as uuidv4 } from 'uuid'
import checkIcon from './assets/check.svg'
import errorIcon from './assets/error.svg'
import infoIcon from './assets/info.svg'
import warningIcon from './assets/warning.svg'

export const returnToast = (message, type, title="") => {
    console.log(message)
    switch (message.type.toLowerCase()) {
        case "success":
            return {
                id: uuidv4(),
                title,
                description: message.message,
                backgroundColor: '#5cb85c',
                icon: checkIcon
            }
        case "error":
            return {
                id: uuidv4(),
                title: title,
                description: message.message,
                backgroundColor: '#FF0000',
                icon: errorIcon
            }
        case "warning":
            return {
                id: uuidv4(),
                title,
                description: message.message,
                backgroundColor: '#f0ad4e',
                icon: warningIcon
            }

        default:
            return {
                id: uuidv4(),
                title: title,
                description: message.message,
                backgroundColor: '#5bc0de',
                icon: infoIcon
            }
    }
}



