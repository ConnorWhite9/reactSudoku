import React from "react";
import '../styles/Button.css';

const SubmitButton = ({ action }) => {
    return (<>
        <div className="center-it">
            <div className="container">
                <button onClick={action} className="button-64" role="button"><span class="text">Check Answers</span></button>
            </div>
        </div>
    </>);
}

export default SubmitButton;



