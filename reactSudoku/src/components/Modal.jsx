import React, {forwardRef} from "react";
import '../styles/Modal.css';

const Modal = forwardRef((props, ref) => {
    return (<>
        <div ref={ref} id="myModal" className="modal">

            
            <div className="modal-content">
            <div className="modal-header">  
                <span className="close">&times;</span>
            </div>
                <p>Some text in the Modal..</p>
                <div className="highlight" style={{backgroundColor: 'green', }}>
                </div>

            </div>

        </div>
                
    
    </>);
})

export default Modal;