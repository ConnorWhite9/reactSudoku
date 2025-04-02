import React, {forwardRef} from "react";
import '../styles/Modal.css';
import checkmark from '../assets/checkmark.png';
import incorrect from '../assets/incorrect.png'

const Modal = forwardRef((props, ref) => {
    const close = () => {
        if (ref?.current) {
            ref.current.style.display = "none";
        }
        props.setIsOpen(false);
    }
    let text = "";
    let color = "";
    let image = "";
    if (props.boolean == true) {
        image = checkmark;
        color = 'green';
        text = "Hello. It seems you might've been right suprisingly. Keep up the mediocre work you fool.";
    } else {
        image = incorrect;
        text = "Yeah well that was far from right. I never expected anything more from you though. You could try to fix your mistakes but let's be honest you could never do that.";
        color = 'red';
    }
    return (<>
        <div ref={ref} id="myModal" className="modal">

            
            <div className="modal-content">
                <div className="modal-header">  
                    <span onClick={close} className="close">&times;</span>
                </div>
                <div className="img-container">
                    <img style={{height: '10rem', width: '10rem'}} src={image} />
                    <p className="response">{text}</p>
                </div>
                {/*<div className="highlight" style={{backgroundColor: color, }}>
                </div>*/}

            </div>

        </div>
                
    
    </>);
})

export default Modal;