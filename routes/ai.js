const express = require('express');
const router = express.Router();
const axios = require('axios');

// OpenAI API configuration
const { OpenAI } = require('openai');

// Function to get OpenAI client with API key
const getOpenAIClient = (apiKey) => {
  return new OpenAI({
    apiKey: apiKey,
  });
};

// Function to get Hugging Face client with API key
const getHuggingFaceClient = (apiKey) => {
  return axios.create({
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
};

/**
 * @route   POST api/ai/generate
 * @desc    Generate blog content using OpenAI
 * @access  Public
 */
router.post('/generate', async (req, res) => {
  try {
    const { topic, length, tone, apiKey, service } = req.body;

    if (!topic || !length || !tone || !apiKey || !service) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    let content = '';

    if (service === 'openai') {
      // Use OpenAI API
      const openai = getOpenAIClient(apiKey);
      
      const prompt = `Write a ${length} blog post about ${topic} in a ${tone} tone. The blog post should be well-structured with headings, subheadings, and paragraphs.`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional blog writer who creates engaging, informative content." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });
      
      content = response.choices[0].message.content;
    } else if (service === 'huggingface') {
      // Use Hugging Face API
      const huggingface = getHuggingFaceClient(apiKey);
      
      const prompt = `Write a ${length} blog post about ${topic} in a ${tone} tone. The blog post should be well-structured with headings, subheadings, and paragraphs.`;
      
      const response = await huggingface.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false
          }
        }
      );
      
      content = response.data[0].generated_text;
    } else {
      return res.status(400).json({ msg: 'Invalid service selected' });
    }

    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

/**
 * @route   POST api/ai/edit
 * @desc    Edit existing content using AI
 * @access  Public
 */
router.post('/edit', async (req, res) => {
  try {
    const { content, instruction, apiKey, service } = req.body;

    if (!content || !instruction || !apiKey || !service) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    let editedContent = '';

    if (service === 'openai') {
      // Use OpenAI API
      const openai = getOpenAIClient(apiKey);
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional editor who improves written content." },
          { role: "user", content: `Edit the following content according to these instructions: ${instruction}\n\nContent: ${content}` }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });
      
      editedContent = response.choices[0].message.content;
    } else if (service === 'huggingface') {
      // Use Hugging Face API
      const huggingface = getHuggingFaceClient(apiKey);
      
      const prompt = `Edit the following content according to these instructions: ${instruction}\n\nContent: ${content}`;
      
      const response = await huggingface.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false
          }
        }
      );
      
      editedContent = response.data[0].generated_text;
    } else {
      return res.status(400).json({ msg: 'Invalid service selected' });
    }

    res.json({ content: editedContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

/**
 * @route   POST api/ai/outline
 * @desc    Generate an outline for a blog post
 * @access  Public
 */
router.post('/outline', async (req, res) => {
  try {
    const { topic, sections, apiKey, service } = req.body;

    if (!topic || !sections || !apiKey || !service) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    let outline = '';

    if (service === 'openai') {
      // Use OpenAI API
      const openai = getOpenAIClient(apiKey);
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional blog writer who creates detailed outlines." },
          { role: "user", content: `Create a detailed outline for a blog post about ${topic} with ${sections} main sections. Include a title, introduction, main sections with subpoints, and conclusion.` }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });
      
      outline = response.choices[0].message.content;
    } else if (service === 'huggingface') {
      // Use Hugging Face API
      const huggingface = getHuggingFaceClient(apiKey);
      
      const prompt = `Create a detailed outline for a blog post about ${topic} with ${sections} main sections. Include a title, introduction, main sections with subpoints, and conclusion.`;
      
      const response = await huggingface.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            return_full_text: false
          }
        }
      );
      
      outline = response.data[0].generated_text;
    } else {
      return res.status(400).json({ msg: 'Invalid service selected' });
    }

    res.json({ outline });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;