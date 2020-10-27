import React, { useState, useContext } from 'react'
import Resizer from 'react-image-file-resizer'
import { CircularProgress } from '@material-ui/core'
import { Image } from "@material-ui/icons"
import axios from '../../axios'
import { ToastContext } from '../../context/toast/toastContext'


const ImageUpload = ({ token, currentRoom, setInput, input, singleUpload = true }) => {

    const { setToast } = useContext(ToastContext)

    const [picLoading, setPicLoading] = useState(false)

    const fileResizeAndUpload = async (event) => { //npm package react-image-file-resizer

        setPicLoading(true)
        let fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {

            Resizer.imageFileResizer(
                event.target.files[0],
                1000,
                1000,
                'JPEG',
                100,
                0,
                async uri => {
                    try {
                        const { data } = await axios.post('/api/auth/image', { image: uri }, {
                            headers: {
                                authtoken: token
                            }
                        })
                        setInput({
                            ...input,
                            pic: [...input.pic, data]
                        })

                    } catch (error) {
                        console.log('Error uploading photo(s)', error)
                        setToast("Error uploading image", error)
                    } finally {
                        setPicLoading(false)
                    }

                },
                'base64'
            );
        }
    }

    return (

        <div className="image-upload" >
            <label style={{ cursor: "pointer" }}>
                <div>
                    {!picLoading ?
                        <Image titleAccess="Add Image" />
                        :
                        <CircularProgress />}
                </div>
                    <input
                        disabled={!currentRoom}
                        hidden
                        accept="image/*"
                        placeholder='Images'
                        type="file"
                        onChange={fileResizeAndUpload}
                    />
            </label>

        </div>

    )
}

export default ImageUpload