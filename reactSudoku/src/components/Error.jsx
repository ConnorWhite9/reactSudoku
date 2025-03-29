import { forwardRef } from "react";
import incorrect from "../assets/incorrect.png";

const Error = forwardRef((props, ref) => {

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
                <img style={{height: '10rem', width: '10rem'}} src={incorrect} />
                <p className="response" style={{color: 'white'}}>{props.error}</p>
            </div>
            <div className="highlight" style={{backgroundColor: 'red', }}>
            </div>
        
            </div>
        
        </div>
    
    </>)
});

export default Error;