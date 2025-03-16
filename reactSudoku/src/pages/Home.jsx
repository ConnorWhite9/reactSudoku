import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router";
import SubmitButton from '../components/SubmitButton';
import Modal from '../components/Modal';

const Home = () => {
    const navigate = useNavigate();
    const goTo = () => {
        navigate("/sudokuPage");
    }

    const childRef = useRef(null);

    const showChild = () => {
        if (childRef.current) {
        childRef.current.style.display = "block";  // Show the child component
        }
    };

    const hideChild = () => {
        if (childRef.current) {
        childRef.current.style.display = "none";  // Hide the child component
        }
    };
    
    return (<>
        <Modal ref={childRef} />
        <button onClick={showChild}>Show Child</button>
        <button onClick={hideChild}>Hide Child</button>
        <button onClick={goTo}>Please Click Me</button>
    </>)
}

export default Home;