import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer'
import { LinearProgress } from '@material-ui/core/';
import axios from '../../../axios'


const ImageUpload = ({ user, token, updateUser, userMenu, toggleAccountMenu, singleUpload = true }) => {
    
    const [ picLoading, setPicLoading ] = useState(false)

    const fileResizeAndUpload = async (event) => { //npm package react-image-file-resizer
 
        setPicLoading(true)
        let fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            console.log('tye fileinput')
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
                        updateUser(data)

                    } catch (error) {
                        console.log('Error uploading photo(s)', error)
                    } finally {
                        setPicLoading(false)
                        toggleAccountMenu(!userMenu)
                    }

                },
                'base64'
            );
        }
    }

    // const deleteImage = async (id) => {

    //     try {
    //         setPicLoading(true)
    //         await axios.delete('/api/auth/avatar', {
    //             public_id: id
    //         }, {
    //             headers: {
    //                 authtoken: user.token
    //             }
    //         })
    //         if (singleUpload) {
    //             setImages({ url: '', public_id: '' })

    //         } else {
    //             let filteredImages = images.filter(image => image.public_id !== id)
    //             setImages(filteredImages)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setPicLoading(false)
    //     }

    // }
 
    return (
       
            <div className="image-upload" >
                    <label style={{cursor:"pointer"}}>
                        <div>
                            {!picLoading ?
                                <div style={{color: 'darkblue'}}>{user?.photoUrl ? "Change" : "Select" } Avatar</div>
                                :
                               <LinearProgress />}
                        </div>
                        <input
                            disabled={picLoading}
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
