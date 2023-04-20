import React from "react";
import './Modal.css'

export const Modal = ({active, setActive, children}) => {
    return (
        <div className={active? 'modal active': 'modal'} onClick={() => setActive(false)}>
            <div className='modal-content' onClick={event => event.stopPropagation()}>
                {children}
            </div>

        </div>
    )

}