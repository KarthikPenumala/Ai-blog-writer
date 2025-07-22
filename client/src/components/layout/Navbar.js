import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaPen, FaHome, FaInfoCircle, FaEdit, FaListUl } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <nav className="navbar" style={{background: darkMode ? 'linear-gradient(to right, #121212, #1e1e1e)' : 'linear-gradient(to right, #343a40, #2c3e50)'}}>
      <h1 style={{animation: 'float 6s ease-in-out infinite'}}>
        <Link to="/">
          <FaPen className="icon-float" /> AI Blog Writer
        </Link>
      </h1>
      <ul className={isVisible ? 'fadeIn' : ''} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out'}}>
        <li>
          <Link to="/">
            <FaHome className="icon-float" /> Home
          </Link>
        </li>
        <li>
          <Link to="/generator">
            <FaPen className="icon-float" /> Generator
          </Link>
        </li>
        <li>
          <Link to="/editor">
            <FaEdit className="icon-float" /> Editor
          </Link>
        </li>
        <li>
          <Link to="/outline">
            <FaListUl className="icon-float" /> Outline
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FaInfoCircle className="icon-float" /> About
          </Link>
        </li>
        <li>
          <button 
            onClick={toggleDarkMode} 
            className="btn"
            style={{animation: 'pulse 2s infinite', background: darkMode ? '#f8f9fa' : '#343a40', color: darkMode ? '#121212' : '#f8f9fa'}}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;