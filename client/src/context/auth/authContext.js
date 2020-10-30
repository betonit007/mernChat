import React, { useReducer, createContext, useContext } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken.js'
import { ToastContext } from '../../context/toast/toastContext'
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_LOADING, LOGOUT, CLEAR_ERRORS, UPDATE_USER, TOGGLE_USER_MENU } from '../types'

export const AuthContext = createContext()

const AuthState = props => {

    const { setToast } = useContext(ToastContext)

    const intialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
        showAccountMenu: false,
        saved: []
    }

    const [state, dispatch] = useReducer(authReducer, intialState)

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
            try {
                const res = await axios.get('/api/auth');
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            } catch (err) {
                console.log(err)
                dispatch({ type: AUTH_ERROR })
            }
        }
    }
    //Register User 
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth/newuser', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            setToast('success', "Registration Successful, welcome!")
            
        } catch (err) {
            console.log(err.response.data.msg);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
            setToast('error', err.response.data.msg)
        }
    }

    //Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth/login', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();

        } catch (err) {
            setToast("error", "Invalid login credentials")
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
        }

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    //UPDATE USER info (account changes / avatar update)
    const updateUser = (userInfo) => {
        dispatch({
            type: UPDATE_USER,
            payload: userInfo
        })
    }

    //Logout
    const logout = () => dispatch({ type: LOGOUT });

    //Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    const toggleAccountMenu = () => {
        dispatch({
            type: TOGGLE_USER_MENU
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                saved: state.saved,
                showAccountMenu: state.toggleAccountMenu,
                loadUser,
                register,
                login,
                setLoading,
                logout,
                clearErrors,
                updateUser,
                toggleAccountMenu
            }}
        > {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState