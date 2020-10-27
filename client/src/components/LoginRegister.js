import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth/authContext'
import { ToastContext } from '../context/toast/toastContext'

const LoginRegister = () => {

    const { login, register } = useContext(AuthContext)
    const { setToast } = useContext(ToastContext)

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginState: false
    })

    const { name, email, password, confirmPassword, loginState } = userInfo

    const handleSubmit = e => {
        e.preventDefault()
       if (!loginState) {
         login({email, password})
       } else {
           if (password !== confirmPassword) {
             return setToast('error', 'Passwords do not match!')
           }
           register({name, email, password})
       }
    }

    const handleInput = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='loginRegister'>
            <h2>{loginState ? "Register" : "Login"}</h2>
            <form className='loginRegister__form' onSubmit={handleSubmit}>
                {loginState &&
                    <input
                        type='text'
                        required={true}
                        value={name}
                        placeholder="Name"
                        name='name'
                        onChange={handleInput}
                    />
                }
                <input
                    type='email'
                    required={true}
                    value={email}
                    placeholder="Email"
                    name='email'
                    onChange={handleInput}
                />
                <input
                    type='password'
                    required={true}
                    value={password}
                    placeholder="Password"
                    name='password'
                    onChange={handleInput}
                />

                {loginState &&
                    <input
                        type='password'
                        required={true}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        onChange={handleInput}
                    />
                }
                <input
                    type='submit'
                    value="Submit"
                />
            </form>
            <p onClick={()=>setUserInfo({ ...userInfo, loginState: !loginState })}>
                {
                    !loginState ?
                        "Click Here to Register"
                        :
                        "Click Here to Login"
                }
            </p>

        </div>
    )
}

export default LoginRegister
