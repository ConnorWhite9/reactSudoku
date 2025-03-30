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
        <div className="homeContainer">
            <div className="btn-container">
                <text className="btn-title">9x9 Sudoku</text>
                <button className="homeBtn" onClick={goTo9}>
                    <Board number={nine} />
                </button>
            </div>
            
            <div className="btn-container">
                <text className="btn-title"> 4x4 Sudoku</text>
                <button className="homeBtn" onClick={goTo4}>
                    <Board number = {four} />
                </button>
            </div>
            
        </div>
    </>)
}

export default Home;