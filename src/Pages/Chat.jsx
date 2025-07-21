import React, { useState, useRef, useEffect } from 'react';
import '../CSS/Chat.css';

// Import icons and components
import { FiEdit, FiPlus, FiLogOut, FiSend, FiMic } from 'react-icons/fi';
import { StartScreen } from '../Components/StartScreen';
import { ChatMessage } from '../Components/ChatMessage';

// --- IMPORTANT: Paste your Gemini API Key here ---
const API_KEY = import.meta.env.VITE_API;


function Chat() {
    const [isChatActive, setIsChatActive] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    const handleStartChat = async (imageFile, imagePreview, techStack) => {
        if (!imageFile || !techStack) return;
        if (API_KEY === "YOUR_GEMINI_API_KEY" ) {
            setError("Please add your Gemini API Key to start.");
            return;
        }
        setIsLoading(true);
        setError('');
        const firstUserMessage = {
            role: 'user',
            content: `Convert this image to a component using ${techStack.label}.`,
            imagePreviewUrl: imagePreview
        };
        setChatHistory([firstUserMessage]);
        setIsChatActive(true);
        try {
            const base64Data = await fileToBase64(imageFile);
            const modelResponseText = await callGeminiAPI(firstUserMessage.content, base64Data, imageFile.type, []);
            const modelMessage = { role: 'model', content: modelResponseText };
            setChatHistory(prev => [...prev, modelMessage]);
        } catch (e) {
            console.error(e);
            setError(`Error: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;
        const newUserMessage = { role: 'user', content: inputValue };
        const newHistory = [...chatHistory, newUserMessage];
        setChatHistory(newHistory);
        setInputValue('');
        setIsLoading(true);
        setError('');
        try {
            const modelResponseText = await callGeminiAPI(inputValue, null, null, chatHistory);
            const modelMessage = { role: 'model', content: modelResponseText };
            setChatHistory(prev => [...prev, modelMessage]);
        } catch (e) {
            console.error(e);
            setError(`Error: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Centralized function to call the Gemini API
    const callGeminiAPI = async (text, base64Data, mimeType, historyContext) => {
        const modelName = "gemini-1.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
        
        const userParts = [];
        if (base64Data) {
            // *** NEW, MUCH STRICTER SYSTEM PROMPT ***
            const systemPrompt = `You are an expert front-end developer. Your primary goal is to create React component code that is 100% self-contained and immediately renderable in a live preview sandbox.

Follow these rules with extreme care:

1.  **No External Dependencies:**
    *   Do NOT import or require any other npm packages, libraries, or files. (e.g., no icon library , lodash, moment, axios, material-ui, etc.).

2.  **Handle Images with Placeholders:**
    *   The user has uploaded an image for you to replicate. If the UI in that image contains its own images (like logos, user avatars, product photos), you MUST NOT use local paths (e.g., '/logo.svg', '../assets/image.png').
    *   Instead, you MUST use a placeholder service. For generic images, use 'https://via.placeholder.com/150'. For user avatars, use 'https://i.pravatar.cc/40'. Or, you can represent them with styled 'div's or simple SVGs.

3.  **Focus on Static UI:**
    *   Prioritize creating a visually accurate, static representation of the UI.
    *   Avoid complex state ('useState', 'useReducer') unless it is absolutely essential for a simple, self-contained UI interaction (like a dropdown or toggle). The code should primarily be JSX and styling.

4.  **Code Format:**
    *   The final output must ONLY be code.
    *   Wrap the React/JSX code in a \`\`\`jsx markdown block.
    *   If you generate separate CSS, wrap it in a \`\`\`css markdown block.
    *   Do NOT include any explanations, introductions, or closing remarks.

User's specific request: "${text}"`;

            userParts.push({ text: systemPrompt });
            userParts.push({ inline_data: { mime_type: mimeType, data: base64Data } });
        } else {
            userParts.push({ text });
        }

        const contents = historyContext.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));
        contents.push({ role: 'user', parts: userParts });

        const payload = { contents };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || "API request failed");
        }
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    };
    
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="chat-container">
            <aside className="sidebar">
                 <div>
                    <div className="sidebar-header">
                        <div className="logo"><FiEdit size={24} /></div>
                        <h1 className="app-title">Mecha AI</h1>
                    </div>
                    <button className="new-chat-button" onClick={() => {
                        setIsChatActive(false);
                        setChatHistory([]);
                        setError('');
                    }}>
                        <FiPlus size={18} /><span>New Conversion</span>
                    </button>
                </div>
                <div className="logout-section">
                    <a href="#logout" className="nav-link"><FiLogOut size={20} /><span>Log Out</span></a>
                </div>
            </aside>

            <main className="main-content">
                {!isChatActive ? (
                    <StartScreen onStart={handleStartChat} isLoading={isLoading} error={error} />
                ) : (
                    <>
                        <header className="chat-header">
                            <h2 className="welcome-message">Mecha UI</h2>
                            <img src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg" alt="User Avatar" className="user-avatar" />
                        </header>
                        <section className="chat-history">
                            {chatHistory.map((msg, index) => <ChatMessage key={index} role={msg.role} content={msg.content} imagePreviewUrl={msg.imagePreviewUrl} />)}
                            {isLoading && (
                                <div className="chat-message model">
                                     <img src="https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg" alt="AI Avatar" className="message-avatar" />
                                     <div className="message-content"><div className="typing-indicator"></div></div>
                                </div>
                            )}
                            {error && <div className="error-message">{error}</div>}
                            <div ref={chatEndRef} />
                        </section>
                        <footer className="chat-input-area">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="chat-input"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask for changes or refinements..."
                                    disabled={isLoading}
                                />
                                <button className="icon-button" onClick={handleSendMessage} disabled={isLoading || !inputValue}><FiSend size={20} /></button>
                                <button className="icon-button" disabled={isLoading}><FiMic size={20} /></button>
                            </div>
                        </footer>
                    </>
                )}
            </main>
        </div>
    );
}

export default Chat;