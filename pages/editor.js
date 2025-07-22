import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaSpinner, FaCopy, FaDownload, FaMagic, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Layout from './components/layout/Layout';

const Editor = ({ darkMode, toggleDarkMode }) => {
  const [formData, setFormData] = useState({
    content: '',
    instruction: '',
    apiKey: '',
    service: 'openai'
  });

  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { content, instruction, apiKey, service } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!content || !instruction || !apiKey) {
      toast.error('Please provide content, instructions, and API key');
      return;
    }

    setLoading(true);
    setEditedContent('');
    setShowPreview(false);

    try {
      const res = await axios.post('/api/edit', formData);
      setEditedContent(res.data.content);
      setShowPreview(true);
      toast.success('Content edited successfully!');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : 'Error editing content'
      );
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedContent);
    toast.info('Content copied to clipboard');
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([editedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `edited-content-${new Date().getTime()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.info('Content downloaded');
  };

  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Head>
        <title>Content Editor - AI Blog Writer</title>
      </Head>
      
      <div className="editor-page">
        <h1 className="large text-primary">Content Editor <FaEdit className="icon-float" /></h1>
        <p className="lead">
          Edit and improve your existing content using AI <FaMagic className="icon-float" />
        </p>

        <div className={`card ${isVisible ? 'fadeIn' : ''}`} style={{opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out', transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="content">Content to Edit</label>
              <textarea
                name="content"
                value={content}
                onChange={onChange}
                placeholder="Paste the content you want to edit"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="instruction">Editing Instructions</label>
              <textarea
                name="instruction"
                value={instruction}
                onChange={onChange}
                placeholder="Provide instructions for how you want the content to be edited (e.g., 'Make it more engaging', 'Fix grammar errors', 'Add more examples')"
                required
                style={{ height: '100px' }}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="service">AI Service</label>
              <select name="service" value={service} onChange={onChange}>
                <option value="openai">OpenAI</option>
                <option value="huggingface">Hugging Face</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="apiKey">API Key</label>
              <input
                type="password"
                name="apiKey"
                value={apiKey}
                onChange={onChange}
                placeholder={`Enter your ${service === 'openai' ? 'OpenAI' : 'Hugging Face'} API key`}
                required
              />
              <small className="form-text">
                We never store your API key. It's only used for this session.
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? (
                <>
                  <FaSpinner className="icon-spin" /> Editing...
                </>
              ) : (
                <>Edit Content <FaEdit /></>
              )}
            </button>
          </form>
        </div>

        {showPreview && (
          <div className="preview-section">
            <h2>Edited Content</h2>
            <div className="preview-actions">
              <button className="btn btn-dark" onClick={copyToClipboard}>
                <FaCopy /> Copy
              </button>
              <button className="btn btn-dark" onClick={downloadContent}>
                <FaDownload /> Download
              </button>
            </div>
            <div className="preview-content">
              <ReactMarkdown>{editedContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Editor;