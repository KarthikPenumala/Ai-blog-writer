import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaSpinner, FaCopy, FaDownload, FaMagic, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import PageTransition from './components/ui/PageTransition';
import AnimatedElement from './components/ui/AnimatedElement';

const Generator = ({ darkMode, toggleDarkMode }) => {
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
      const res = await axios.post('/api/generate', formData);
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
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Head>
        <title>Content Generator - AI Blog Writer</title>
        <meta name="description" content="Generate blog posts and articles using AI" />
      </Head>
      
      <PageTransition>
        <div className="generator-page">
          <AnimatedElement variant="fadeIn">
            <h1 className="large text-primary">
              Content Generator 
              <motion.span
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block', marginLeft: '8px' }}
              >
                <FaPen />
              </motion.span>
            </h1>
            <p className="lead">
              Generate blog posts and articles using AI 
              <motion.span
                animate={{ 
                  y: [0, -5, 0],
                  x: [0, 3, 0, -3, 0],
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ display: 'inline-block', marginLeft: '8px' }}
              >
                <FaMagic />
              </motion.span>
            </p>
          </AnimatedElement>

          <AnimatedElement variant="fadeInUp" delay={0.2} className="card">
          <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="topic">Topic</label>
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
              <label htmlFor="length">Length</label>
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
                  <FaSpinner className="icon-spin" /> Generating...
                </>
              ) : (
                <>Generate Content <FaMagic /></>
              )}
            </button>
          </form>
        </AnimatedElement>

        {showPreview && (
          <AnimatedElement variant="scale" className="preview-section">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Generated Content
            </motion.h2>
            <motion.div 
              className="preview-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.button 
                className="btn btn-dark" 
                onClick={copyToClipboard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCopy /> Copy
              </motion.button>
              <motion.button 
                className="btn btn-dark" 
                onClick={downloadContent}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download
              </motion.button>
            </motion.div>
            <motion.div 
              className="preview-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </motion.div>
          </AnimatedElement>
        )}
      </div>
      </PageTransition>
    </Layout>
  );
};

export default Generator;