import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMoon, FaSun, FaPen, FaHome, FaInfoCircle, FaEdit, FaListUl } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <nav className="navbar" style={{background: darkMode ? 'linear-gradient(to right, #121212, #1e1e1e)' : 'linear-gradient(to right, #343a40, #2c3e50)'}}>
      <h1 style={{animation: 'float 6s ease-in-out infinite'}}>
        <Link href="/">
          <span><FaPen className="icon-float" /> AI Blog Writer</span>
        </Link>
      </h1>
      <ul className={isVisible ? 'fadeIn' : ''} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out'}}>
        <li>
          <Link href="/">
            <span><FaHome className="icon-float" /> Home</span>
          </Link>
        </li>
        <li>
          <Link href="/generator">
            <span><FaPen className="icon-float" /> Generator</span>
          </Link>
        </li>
        <li>
          <Link href="/editor">
            <span><FaEdit className="icon-float" /> Editor</span>
          </Link>
        </li>
        <li>
          <Link href="/outline">
            <span><FaListUl className="icon-float" /> Outline</span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span><FaInfoCircle className="icon-float" /> About</span>
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