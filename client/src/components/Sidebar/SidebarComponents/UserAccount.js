import React from 'react'
import { Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import ImageUpload from './ImageUpload'

const UserAccount = ({ user, toggleAccountMenu, accountMenu, token, updateUser, logout }) => {
    return (
        <div className={`user__account ${accountMenu && 'account_visible'}`} onClick={() => toggleAccountMenu(!accountMenu)}>
            <Close fontSize='small' />
            <div className="userInfo">
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <ImageUpload
                    user={user}
                    token={token}
                    toggleAccountMenu={toggleAccountMenu}
                    userMenu={accountMenu}
                    updateUser={updateUser}
                />
            </div>
            <Button variant="contained" onClick={logout}>Logout</Button>
        </div>
    )
}

export default UserAccount
