//import { } from '../types';
import { returnToast } from '../../components/Toast/toastUtils'

export default (state, action) => {
    const {  } = action.payload
    switch (action.type) {
        case "SET_TOAST":
            const newToast = returnToast(action.payload)
            console.log(newToast)
            return {
                ...state,
                toastList: [...state.toastList, newToast],
            }
        case "SET_LIST":
            return {
                ...state,
                toastList: state.toastList.filter(toast => toast.id !== action.payload)
            }
        default:
            return state
    }
}