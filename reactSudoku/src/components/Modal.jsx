import React, {forwardRef} from "react";
import '../styles/Modal.css';
import checkmark from '../assets/checkmark.png';

const Modal = forwardRef((props, ref) => {
    const close = () => {
        if (ref?.current) {
            ref.current.style.display = "none";
        }
    }
    return (<>
        <div ref={ref} id="myModal" className="modal">

            
            <div className="modal-content">
                <div className="modal-header">  
                    <span onClick={close} className="close">&times;</span>
                </div>
                <div className="img-container">
                    <img style={{height: '10rem', width: '10rem'}} src={checkmark} />
                    <p className="response">Hello. It seems you might've been right suprisingly. Keep up the mediocre work you fool.</p>
                </div>
                <div className="highlight" style={{backgroundColor: 'green', }}>
                </div>

            </div>

        </div>
                
    
    </>);
})

export default Modal;