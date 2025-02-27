import React from "react";
import "../header/heading.css";
import { Link } from "react-router-dom";




const Heading = () => {




  return (
    <header className="header-container">
        <a href="" className="logo">LOGO</a>
      <nav className="navbar">
            <a href="#">Home</a>
            <a href="#">Store</a>
            <a href="#">Song</a>
            <a href="#">Singers</a>
            <a href="#">About</a>
      </nav>
      <div className="logout">
      <p><Link to="/">LOGOUT</Link></p>
      </div>
    </header>
  );
};

export default Heading;
