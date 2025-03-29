import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router";

const Navbar = () => {
    
    return (<>
    
        <div className="navContainer">
            <text className="navStatement"><Link style={{color: 'white'}} to={"/"}>SudokuRot</Link></text>
        </div>
    
    </>);
}


export default Navbar;