import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaMagic, FaLightbulb, FaKey, FaLock, FaGithub } from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-page">
      <h1 className="large text-primary">About AI Blog Writer <FaInfoCircle className="icon-float" /></h1>
      <p className="lead typing-animation">
        A free tool to help you create blog posts and articles using AI
      </p>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.2s'}}>
        <h3><FaMagic className="icon-float" /> How It Works</h3>
        <p>
          AI Blog Writer is a free tool that helps you create blog posts, articles, and outlines using AI. The application uses free AI services to generate content based on your input.
        </p>
        <p>
          You'll need to provide your own API keys for services like OpenAI or Hugging Face. We never store your API keys - they're only used for the current session to generate content.
        </p>
      </div>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.4s'}}>
        <h3><FaLightbulb className="icon-float" /> Features</h3>
        <ul>
          <li>Generate complete blog posts and articles on any topic</li>
          <li>Edit and refine existing content</li>
          <li>Create detailed outlines for your blog posts</li>
          <li>Export content in markdown format</li>
          <li>Dark mode support</li>
          <li>Beautiful animations and visual effects</li>
        </ul>
      </div>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.6s'}}>
        <h3><FaKey className="icon-float" /> Getting API Keys</h3>
        <h4>OpenAI API Key</h4>
        <p>
          To use OpenAI's services, you'll need an API key. You can get one by:
        </p>
        <ol>
          <li>Creating an account at <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary">OpenAI</a></li>
          <li>Going to the API keys section in your account</li>
          <li>Creating a new API key</li>
        </ol>
        <p>
          OpenAI offers a free tier with limited usage. Check their <a href="https://openai.com/pricing" target="_blank" rel="noopener noreferrer" className="text-primary">pricing page</a> for more details.
        </p>

        <h4>Hugging Face API Key</h4>
        <p>
          To use Hugging Face's services, you'll need an API key. You can get one by:
        </p>
        <ol>
          <li>Creating an account at <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer" className="text-primary">Hugging Face</a></li>
          <li>Going to your profile settings</li>
          <li>Creating a new API key</li>
        </ol>
        <p>
          Hugging Face offers free access to many models. Check their <a href="https://huggingface.co/pricing" target="_blank" rel="noopener noreferrer" className="text-primary">pricing page</a> for more details.
        </p>
      </div>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.8s'}}>
        <h3><FaLock className="icon-float" /> Privacy</h3>
        <p>
          We take your privacy seriously. We don't store any of your data, including your API keys or the content you generate. All processing is done on your device and through direct API calls to the AI services you choose.
        </p>
      </div>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1s'}}>
        <h3><FaGithub className="icon-float" /> Open Source</h3>
        <p>
          AI Blog Writer is an open-source project. You can find the source code on <a href="https://github.com/yourusername/ai-blog-writer" target="_blank" rel="noopener noreferrer" className="text-primary">GitHub</a>.
        </p>
      </div>

      <div className={`text-center mt-4 ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1.2s'}}>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;