import React from 'react'
import axios from '../../axios'
import { Close } from '@material-ui/icons'


const ImageContainer = ({ input, setInput, setToast }) => {

    const deleteImage = async (public_id) => {
        console.log('public, id', public_id)
        try {
            
            await axios.post('/api/chats/removeimage', { public_id })
            const newPicArray = input.pic.filter(pic => pic.public_id !== public_id)
            setInput({
                ...input,
                pic: newPicArray
            })

        } catch (error) {
            console.log('Error deleting photo(s)', error)
            setToast("Error deleting image", error)
        }
    }

    return (
        <div className='footer__ImageContainer'>
            {input.pic &&
                input.pic.map(pic => (
                    <div className="previewImgContainer" onClick={()=>deleteImage(pic.public_id)}>
                        <Close />
                        <img key={pic.public_id} src={pic.photoUrl} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

export default ImageContainer
