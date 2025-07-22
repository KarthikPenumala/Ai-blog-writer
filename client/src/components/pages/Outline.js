import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaSpinner, FaCopy, FaDownload, FaMagic, FaListUl } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Outline = () => {
  const [formData, setFormData] = useState({
    topic: '',
    sections: '5',
    apiKey: '',
    service: 'openai'
  });

  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { topic, sections, apiKey, service } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !apiKey) {
      toast.error('Please provide a topic and API key');
      return;
    }

    setLoading(true);
    setOutline('');
    setShowPreview(false);

    try {
      const res = await axios.post('/api/ai/outline', formData);
      setOutline(res.data.outline);
      setShowPreview(true);
      toast.success('Outline generated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : 'Error generating outline'
      );
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outline);
    toast.info('Outline copied to clipboard');
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([outline], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-outline.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.info('Outline downloaded');
  };

  return (
    <div className="outline-page">
      <h1 className="large text-primary">Outline Generator <FaListUl className="icon-float" /></h1>
      <p className="lead">
        Generate detailed outlines for your blog posts <FaMagic className="icon-float" />
      </p>

      <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="topic">Topic *</label>
            <input
              type="text"
              name="topic"
              value={topic}
              onChange={onChange}
              placeholder="Enter a topic for your blog post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sections">Number of Main Sections</label>
            <input
              type="number"
              name="sections"
              value={sections}
              onChange={onChange}
              min="3"
              max="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">AI Service</label>
            <select name="service" value={service} onChange={onChange}>
              <option value="openai">OpenAI (GPT-3.5-Turbo)</option>
              <option value="huggingface">Hugging Face (Mistral-7B)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="apiKey">API Key *</label>
            <input
              type="password"
              name="apiKey"
              value={apiKey}
              onChange={onChange}
              placeholder={`Enter your ${service === 'openai' ? 'OpenAI' : 'Hugging Face'} API key`}
              required
            />
            <small className="form-text">
              Your API key is only used for this request and is not stored.
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Generating...
              </>
            ) : (
              'Generate Outline'
            )}
          </button>
        </form>
      </div>

      {showPreview && (
        <div className="preview-container card" style={{animation: 'fadeIn 0.8s ease-out'}}>
          <div className="preview-header">
            <h3>Generated Outline <FaMagic className="icon-float" /></h3>
            <div>
              <button
                onClick={copyToClipboard}
                className="btn btn-dark"
                title="Copy to clipboard"
                style={{animation: 'pulse 2s infinite'}}
              >
                <FaCopy />
              </button>
              <button
                onClick={downloadContent}
                className="btn btn-dark"
                title="Download as file"
                style={{animation: 'pulse 2s infinite', animationDelay: '0.5s'}}
              >
                <FaDownload />
              </button>
            </div>
          </div>
          <div className="preview-content">
            <ReactMarkdown>{outline}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outline;