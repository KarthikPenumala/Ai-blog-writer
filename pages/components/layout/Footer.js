import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        <span className="hide-sm">AI Blog Writer</span> &copy; {new Date().getFullYear()}
        {' '} Made with <FaHeart style={{ color: '#ff6b6b' }} /> by AI enthusiasts
      </p>
    </footer>
  );
};

export default Footer;