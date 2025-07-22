import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <AnimatePresence mode="wait">
        <Component 
          {...pageProps} 
          key={router.asPath} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      </AnimatePresence>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  );
}

export default MyApp;