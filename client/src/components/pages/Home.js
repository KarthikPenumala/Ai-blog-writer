import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaEdit, FaListUl, FaMagic } from 'react-icons/fa';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home-page">
      <div className="text-center">
        <h1 className="x-large">AI Blog Writer <FaMagic /></h1>
        <p className="lead typing-animation">
          Create high-quality blog posts and articles with the help of AI
        </p>
      </div>

      <div className={`features ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
        <div className="card" style={{transitionDelay: '0.2s'}}>
          <h3>
            <FaPencilAlt className="icon-float" /> Generate Content
          </h3>
          <p>
            Generate complete blog posts and articles on any topic using free AI services.
          </p>
          <Link to="/generator" className="btn btn-primary">
            Try Generator
          </Link>
        </div>

        <div className="card" style={{transitionDelay: '0.4s'}}>
          <h3>
            <FaEdit className="icon-float" /> Edit Content
          </h3>
          <p>
            Edit and refine your existing content with AI assistance to make it more engaging.
          </p>
          <Link to="/editor" className="btn btn-primary">
            Try Editor
          </Link>
        </div>

        <div className="card" style={{transitionDelay: '0.6s'}}>
          <h3>
            <FaListUl className="icon-float" /> Create Outlines
          </h3>
          <p>
            Generate detailed outlines for your blog posts to structure your content effectively.
          </p>
          <Link to="/outline" className="btn btn-primary">
            Try Outline Generator
          </Link>
        </div>
      </div>

      <div className={`card text-center mt-4 ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-in-out, transform 1s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.8s'}}>
        <h3>How It Works <FaMagic className="icon-float" /></h3>
        <p>
          AI Blog Writer uses free AI services to help you create content. You'll need to provide your own API keys for services like OpenAI or Hugging Face.
        </p>
        <p>
          Don't worry - we never store your API keys. They're only used for the current session to generate content.
        </p>
        <Link to="/about" className="btn btn-dark">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;