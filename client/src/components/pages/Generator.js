import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaSpinner, FaCopy, FaDownload, FaMagic, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Generator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    length: 'medium',
    tone: 'informative',
    apiKey: '',
    service: 'openai'
  });

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { topic, length, tone, apiKey, service } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !apiKey) {
      toast.error('Please provide a topic and API key');
      return;
    }

    setLoading(true);
    setContent('');
    setShowPreview(false);

    try {
      const res = await axios.post('/api/ai/generate', formData);
      setContent(res.data.content);
      setShowPreview(true);
      toast.success('Content generated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : 'Error generating content'
      );
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.info('Content copied to clipboard');
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.info('Content downloaded');
  };

  return (
    <div className="generator-page">
      <h1 className="large text-primary">Content Generator <FaPen className="icon-float" /></h1>
      <p className="lead">
        Generate blog posts and articles using AI <FaMagic className="icon-float" />
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
            <label htmlFor="length">Content Length</label>
            <select name="length" value={length} onChange={onChange}>
              <option value="short">Short (300-500 words)</option>
              <option value="medium">Medium (500-800 words)</option>
              <option value="long">Long (800-1200 words)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tone">Tone</label>
            <select name="tone" value={tone} onChange={onChange}>
              <option value="informative">Informative</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
              <option value="persuasive">Persuasive</option>
              <option value="entertaining">Entertaining</option>
            </select>
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
              'Generate Content'
            )}
          </button>
        </form>
      </div>

      {showPreview && (
        <div className="preview-container card" style={{animation: 'fadeIn 0.8s ease-out'}}>
          <div className="preview-header">
            <h3>Generated Content <FaMagic className="icon-float" /></h3>
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generator;