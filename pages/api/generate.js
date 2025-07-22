import { OpenAI } from 'openai';
import axios from 'axios';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

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
}