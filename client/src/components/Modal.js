import React from 'react'

const Modal = ({children}) => {
    return (
        <div className='modal'>
            <div className="modal__body">
               {children}
            </div>
        </div>

        //STOP PROPAGATION EXAMPLE
        // <div className='modal' onClick={()=>setModal(!modal)}>
        //   <div className="modal__body" onClick={e=>e.stopPropagation()}>
        //    {children}
        //   </div>
        // </div>
    )
}

export default Modal
