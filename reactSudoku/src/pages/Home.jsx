import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router";
import SubmitButton from '../components/SubmitButton';
import Modal from '../components/Modal';

const Home = () => {
    const navigate = useNavigate();
    const goTo4 = () => {
        navigate("/sudokuPage/4");
    }
    const goTo9 = () =>{
        navigate("sudokuPage/9");
    }

    
    return (<>
        <button onClick={goTo4}>4 Page Sudoku</button>
        <button onClick={goTo9}>9 Sudoku</button>
    </>)
}

export default Home;