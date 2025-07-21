import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiEye } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

// Helper to check for code blocks
const containsCode = (text) => text && text.includes('```');

// Updated helper to parse and separate JSX and CSS
const parseCodeFromMarkdown = (text) => {
    const blocks = { jsx: null, css: null };
    const regex = /```(\w+)\n([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const language = match[1].toLowerCase();
        const code = match[2].trim();
        if (language === 'jsx' || language === 'javascript' || language === 'react') {
            blocks.jsx = code;
        } else if (language === 'css') {
            blocks.css = code;
        }
    }
    // If only one block is found and it's not css, assume it's jsx (for tailwind cases)
    if (!blocks.jsx && !blocks.css) {
        const singleBlockMatch = /```\n([\s\S]*?)```/g.exec(text);
        if (singleBlockMatch) blocks.jsx = singleBlockMatch[1].trim();
    } else if (text.includes('className=') && !blocks.css) {
         const jsxMatch = /```(?:jsx|javascript|react)?\n([\s\S]*?)```/g.exec(text);
         if(jsxMatch) blocks.jsx = jsxMatch[1].trim();
    }


    return blocks;
};

export const ChatMessage = ({ role, content, imagePreviewUrl }) => {
    const isModel = role === 'model';
    const avatar = isModel ? "https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg" : "https://cdn.prod.website-files.com/6794ac644ed360d5530891ce/67a0614d8af8f263184dee28_logo-icon.svg";
    const avatarAlt = isModel ? "AI Avatar" : "User Avatar";
    const [copyStatus, setCopyStatus] = useState({});

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopyStatus({ main: 'Copied!' });
            setTimeout(() => setCopyStatus({}), 2000);
        });
    };

    const handlePreview = (codeBlocks) => {
        if (!codeBlocks.jsx) return;
        const id = uuidv4();
        // Store both JSX and CSS (if it exists)
        localStorage.setItem(`preview-${id}`, JSON.stringify(codeBlocks));
        window.open(`/preview/${id}`, '_blank');
    };

    const codeBlocks = containsCode(content) ? parseCodeFromMarkdown(content) : null;

    return (
        <div className={`chat-message ${role}`}>
            <img src={avatar} alt={avatarAlt} className="message-avatar" />
            <div className="message-content">
                {imagePreviewUrl && (
                    <img src={imagePreviewUrl} alt="Uploaded content" className="chat-image-preview" />
                )}
                
                {codeBlocks && codeBlocks.jsx ? (
                    <div className="code-container">
                        <div className="code-toolbar">
                            <span className="code-language">GENERATED COMPONENT</span>
                            <div className="code-actions">
                                <button className="code-action-btn" onClick={() => handlePreview(codeBlocks)}>
                                    <FiEye size={16} /> Live Preview
                                </button>
                                <button className="code-action-btn" onClick={() => handleCopy(codeBlocks.jsx + (codeBlocks.css ? `\n\n/* CSS */\n${codeBlocks.css}` : ''))}>
                                    <FiCopy size={16} /> {copyStatus.main || 'Copy All'}
                                </button>
                            </div>
                        </div>
                        <SyntaxHighlighter language="jsx" style={atomDark} PreTag="div">
                            {codeBlocks.jsx}
                        </SyntaxHighlighter>
                        {codeBlocks.css && (
                             <SyntaxHighlighter language="css" style={atomDark} PreTag="div">
                                {codeBlocks.css}
                            </SyntaxHighlighter>
                        )}
                    </div>
                ) : (
                    <p>{content}</p>
                )}
            </div>
        </div>
    );
};