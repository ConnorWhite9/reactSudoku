import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router";
import SubmitButton from '../components/SubmitButton';
import Modal from '../components/Modal';
import '../App.css';
import {nine , four} from '../data/mocks.js';
import Board from '../components/Board.jsx';

const Home = () => {
    const navigate = useNavigate();
    const goTo4 = () => {
        navigate("/sudokuPage/4");
    }
    const goTo9 = () =>{
        navigate("sudokuPage/9");
    }

  

    return (<>
        <button onClick={goTo9}>
            <Board number={nine} />

        </button>
        <button onClick={goTo4}>

            <Board number = {four} />
        </button>
    </>)
}

export default Home;