import React from 'react'

const ImageContainer = ({ input }) => {
    return (
        <div className='footer__ImageContainer'>
            {input.pic &&
                input.pic.map(pic => <img key={pic.public_id} src={pic.photoUrl} alt="" />)
            }
        </div>
    )
}

export default ImageContainer
