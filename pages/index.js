import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FaPencilAlt, FaEdit, FaListUl, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import PageTransition from './components/ui/PageTransition';
import AnimatedElement from './components/ui/AnimatedElement';

const Home = ({ darkMode, toggleDarkMode }) => {
  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Head>
        <title>AI Blog Writer - Create blog posts with AI</title>
        <meta name="description" content="Create high-quality blog posts and articles with the help of AI" />
      </Head>
      
      <PageTransition>
        <div className="home-page">
          <AnimatedElement variant="fadeIn" className="text-center">
            <motion.h1 
              className="x-large"
              animate={{ 
                textShadow: [
                  '0 0 5px rgba(0,153,255,0.5)', 
                  '0 0 15px rgba(0,153,255,0.8)', 
                  '0 0 5px rgba(0,153,255,0.5)'
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              AI Blog Writer <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block' }}
              >
                <FaMagic />
              </motion.span>
            </motion.h1>
            <motion.p 
              className="lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Create high-quality blog posts and articles with the help of AI
            </motion.p>
          </AnimatedElement>

        <motion.div 
          className="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <AnimatedElement variant="fadeInLeft" delay={0.2} className="card">
            <h3>
              <FaPencilAlt className="icon-float" /> Generate Content
            </h3>
            <p>
              Generate complete blog posts and articles on any topic using AI services.
            </p>
            <Link href="/generator" className="btn btn-primary">
              Try Generator
            </Link>
          </AnimatedElement>

          <AnimatedElement variant="fadeInUp" delay={0.4} className="card">
            <h3>
              <FaEdit className="icon-float" /> Edit Content
            </h3>
            <p>
              Edit and refine your existing content with AI assistance to make it more engaging.
            </p>
            <Link href="/editor" className="btn btn-primary">
              Try Editor
            </Link>
          </AnimatedElement>

          <AnimatedElement variant="fadeInRight" delay={0.6} className="card">
            <h3>
              <FaListUl className="icon-float" /> Create Outlines
            </h3>
            <p>
              Generate detailed outlines for your blog posts to structure your content effectively.
            </p>
            <Link href="/outline" className="btn btn-primary">
              Try Outline Generator
            </Link>
          </AnimatedElement>
        </motion.div>

        <AnimatedElement variant="scale" delay={0.8} className="card text-center mt-4">
          <h3>
            How It Works 
            <motion.span
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{ display: 'inline-block', marginLeft: '8px' }}
            >
              <FaMagic />
            </motion.span>
          </h3>
          <p>
            AI Blog Writer uses AI services to help you create content. You'll need to provide your own API keys for services like OpenAI or Hugging Face.
          </p>
          <p>
            Don't worry - we never store your API keys. They're only used for the current session to generate content.
          </p>
        </AnimatedElement>
      </div>
      </PageTransition>
    </Layout>
  );
};

export default Home;