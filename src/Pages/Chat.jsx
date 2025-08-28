// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FiUploadCloud, FiSend, FiCopy, FiEye, FiX, FiUser, FiCpu } from 'react-icons/fi';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_API;
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to convert a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

// Sub-component to render the model's response, handling special code blocks
const ModelResponse = ({ content, projectId }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeBlockRegex = /```html\n([\s\S]*?)\n```/;
  const codeMatch = content.match(codeBlockRegex);

  // If the response is just plain text without a code block
  if (!codeMatch) {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  const beforeCode = content.split(codeBlockRegex)[0];
  const code = codeMatch[1].trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div>
      {beforeCode && <p className="mb-4 whitespace-pre-wrap">{beforeCode}</p>}
      <div className="bg-[#030303] border border-gray-700 rounded-lg">
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <span className="text-xs font-semibold text-gray-400">HTML + Tailwind CSS</span>
          <div className="flex gap-3">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors">
              <FiCopy size={12}/> {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <Link to={`/preview/${projectId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors">
              <FiEye size={12}/> Preview
            </Link>
          </div>
        </div>
        <pre className="p-4 overflow-x-auto text-sm"><code>{code}</code></pre>
      </div>
    </div>
  );
};


// --- Main Chat Component ---
export default function Chat() {
  const [user, setUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Effect for authenticating the user and protecting the route
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);
  
  // Effect for auto-scrolling to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!currentMessage.trim() && !image) || isLoading) return;

    const userMessageContent = currentMessage;
    const userMessage = { role: 'user', content: userMessageContent, image: imagePreview };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Reset inputs immediately for a snappy UI feel
    setCurrentMessage('');
    setImage(null);
    setImagePreview('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const promptParts = [
        ...chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
        `user: ${userMessageContent}`,
        `
        SYSTEM PROMPT: You are an expert Tailwind CSS developer.
        - If the user asks for a UI component from an image or description, provide ONLY the raw HTML code for it inside a single \`\`\`html code block.
        - If the user asks for a change to previous code or a general question, respond in plain text, or provide the full updated code in an html block.
        - NEVER add explanations outside the code block if you are providing code. The user wants to copy and paste directly.
        `
      ];
      
      if (image) {
        const imagePart = await fileToGenerativePart(image);
        promptParts.push(imagePart);
      }
      
      const result = await model.generateContent(promptParts);
      const response = await result.response;
      let text = response.text();

      // Check if the response contains code and save it to Supabase to get an ID
      const codeBlockRegex = /```html\n([\s\S]*?)\n```/;
      const codeMatch = text.match(codeBlockRegex);
      let projectId = null;

      if (codeMatch && codeMatch[1]) {
        const extractedCode = codeMatch[1].trim();
        const { data, error } = await supabase
          .from('projects')
          .insert({ code: extractedCode, user_id: user.id, name: 'Untitled Component' })
          .select('id')
          .single();
        
        if (error) {
            console.error('Supabase insert error:', error);
            throw new Error('Failed to save project to database.');
        }
        projectId = data.id;
      }
      
      setChatHistory(prev => [...prev, { role: 'model', content: text, projectId }]);

    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) return null; // Or a full-screen loader

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col">
      <header className="sticky top-0 bg-[#030303]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <nav className="container mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/dashboard">
            <img src={'/mecha.svg'} alt="Mecha Logo" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
            <Link to="/dashboard" className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white bg-[#1a1a1a] rounded-md transition-colors">
              Dashboard
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto p-4 lg:p-6 flex flex-col max-h-[calc(100vh-69px)]">
        {/* Chat History */}
        <div className="flex-grow overflow-y-auto space-y-8 pr-2">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex gap-4 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f25f30] flex items-center justify-center"><FiCpu /></div>}
              <div className={`max-w-xl lg:max-w-3xl rounded-lg p-4 ${msg.role === 'user' ? 'bg-[#1a1a1a]' : 'bg-transparent'}`}>
                {msg.image && <img src={msg.image} alt="User upload" className="rounded-lg mb-2 max-h-64" />}
                <ModelResponse content={msg.content} projectId={msg.projectId} />
              </div>
              {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><FiUser /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 items-start justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f25f30] flex items-center justify-center animate-pulse"><FiCpu /></div>
              <div className="max-w-xl rounded-lg p-4 bg-transparent">
                 <div className="h-2 w-16 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Form */}
        <div className="flex-shrink-0 pt-4">
          <form onSubmit={handleSendMessage} className="relative bg-[#1a1a1a] border border-gray-700 rounded-lg p-2 flex items-center gap-2 focus-within:border-[#f25f30] transition-colors">
            {imagePreview && (
              <div className="relative ml-1">
                <img src={imagePreview} className="h-12 w-12 rounded-md object-cover" alt="Preview"/>
                <button type="button" onClick={() => {setImage(null); setImagePreview('')}} className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 rounded-full text-white hover:bg-red-500"><FiX size={12}/></button>
              </div>
            )}
            <label htmlFor="file-upload" className="p-2 text-gray-400 hover:text-white cursor-pointer transition-colors"><FiUploadCloud size={20}/></label>
            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Describe the component, upload an image, or ask for changes..."
              className="flex-grow bg-transparent focus:outline-none px-2 text-white placeholder-gray-500"
            />
            <button type="submit" disabled={isLoading || (!currentMessage.trim() && !image)} className="p-2 bg-[#f25f30] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"><FiSend size={20}/></button>
          </form>
        </div>
      </main>
    </div>
  );
}