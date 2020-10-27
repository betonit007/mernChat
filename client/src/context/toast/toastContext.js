import React, { useReducer, createContext } from 'react';
import toastReducer from './toastReducer'
import {  } from '../types'

export const ToastContext = createContext()

const ToastState = props => {
    const initialState = {
        toastList: [],
    }

    const [state, dispatch] = useReducer(toastReducer, initialState)

    const setToast = (type, message) => {
      const toast = { 
          type,
          message,
        }
      
      dispatch({
          type: "SET_TOAST",
          payload: toast
      })
    }

    const deleteToast = id => {

        dispatch({
           type: "SET_LIST",
           payload: id
        })
    }

    return (
        <ToastContext.Provider
            value={{
                toastList: state.toastList,
                setToast,
                deleteToast
            }}
        >
            {props.children}
        </ToastContext.Provider>
    )
}

export default ToastState;