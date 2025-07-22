import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;