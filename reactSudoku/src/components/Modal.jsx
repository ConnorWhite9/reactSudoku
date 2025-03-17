import React, {forwardRef} from "react";
import '../styles/Modal.css';
import checkmark from '../assets/checkmark.png';

const Modal = forwardRef((props, ref) => {
    return (<>
        <div ref={ref} id="myModal" className="modal">

            
            <div className="modal-content">
            <div className="modal-header">  
                <span className="close">&times;</span>
            </div>
                <img style={{height: '50px', width: '50px'}} src={checkmark} />
                <p>Some text in the Modal..</p>
                <div className="highlight" style={{backgroundColor: 'green', }}>
                </div>

            </div>

        </div>
                
    
    </>);
})

export default Modal;