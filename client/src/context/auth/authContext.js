import React, { useReducer, createContext } from 'react';
import axios from '../../axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken.js'
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_LOADING, LOGOUT, CLEAR_ERRORS } from '../types'

export const AuthContext = createContext()

const AuthState = props => {
    const intialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
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
            
        } catch (err) {
            console.log(err.response.data.msg);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
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

    //Logout
    const logout = () => dispatch({ type: LOGOUT });

    //Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
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
                loadUser,
                register,
                login,
                setLoading,
                logout,
                clearErrors
            }}
        > {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState