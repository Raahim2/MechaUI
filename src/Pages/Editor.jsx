import React, { useState } from 'react';
// Corrected import to use the standard 'Editor' name
import Editor from '@monaco-editor/react';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiSmartphone, 
  FiTablet, 
  FiMonitor, 
  FiMaximize,
  FiMinimize,
  FiCopy,
  FiCheck
} from 'react-icons/fi';

import Header from '../Components/Header';

import { useNavigate } from 'react-router-dom';

const EditorComponent = () => { // Renamed component to avoid conflict with the imported 'Editor'
  // State for the code
  const [htmlCode, setHtmlCode] = useState(
    '<div class="h-full w-full bg-black text-white flex items-center justify-center text-2xl">\n  This is a text\n</div>'
  );

  // State for responsive preview
  const [previewWidth, setPreviewWidth] = useState('100%'); // '100%', '768px', '375px'
  const [activeView, setActiveView] = useState('monitor'); // 'monitor', 'tablet', 'smartphone'
  
  // State for editor/preview layout
  const [isMaximized, setIsMaximized] = useState(false); // true for preview-only, false for split view
  
  // State for copy button feedback
  const [isCopied, setIsCopied] = useState(false);

  // Handler for Monaco Editor changes
  const handleEditorChange = (value) => {
    setHtmlCode(value);
  };

  const navigate = useNavigate();

  // Function to handle the navigation to the publish page
  const handlePublishRedirect = () => {
    const encodedCode = encodeURIComponent(htmlCode);
    
    navigate(`/publish?code=${encodedCode}`);
  };

  // Creates the HTML document for the iframe
  const createSrcDoc = (html) => `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>html, body { height: 100%; margin: 0; padding: 0; }</style>
      </head>
      <body>${html}</body>
    </html>
  `;
  
  // --- KEY CHANGE: Monaco editor configuration options ---
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16, bottom: 16 },
    fontLigatures: true,
  };

  // Handles copying code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Viewport button handler
  const handleViewChange = (view, width) => {
    setActiveView(view);
    setPreviewWidth(width);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white font-sans text-sm text-gray-700">
      {/* === Header === */}
     

      <Header>
        <button className="rounded-md bg-cyan-500 px-6 py-2 font-semibold text-white transition hover:bg-cyan-600" onClick={handlePublishRedirect}>
            Next
        </button>
      </Header>
     

      {/* === Main Content (Editor + Preview) === */}
      <main className="flex flex-1 overflow-hidden">
        {/* --- Left Pane: Editor --- */}
        <div className={`flex-col border-r border-gray-200 ${isMaximized ? 'hidden' : 'flex w-1/2'}`}>
          <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
            <div className="flex items-center">
              <button className="border-b-2 border-cyan-500 px-3 py-3 font-semibold text-cyan-500">
                HTML
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-500 hover:bg-gray-100">
                <span>Tidy</span>
              </button>
              <button 
                onClick={handleCopyCode}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-500 hover:bg-gray-100"
              >
                {isCopied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Area */}
          <div className="flex-1 overflow-hidden">
            {/* --- KEY CHANGE: Using 'Editor' component with 'vs-light' theme --- */}
            <Editor
              height="100%"
              language="html"
              theme="vs-light" 
              value={htmlCode}
              onChange={handleEditorChange}
              options={editorOptions}
              loading={<div className="p-4 text-gray-500">Loading Editor...</div>}
            />
          </div>

          <div className="flex h-10 items-center justify-between border-t border-gray-200 px-4 bg-white z-10">
            <span className="text-gray-500">Generated CSS</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">1.13 kB</span>
              <FiChevronUp className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* --- Resizer Handle --- */}
        <div className={`w-1 cursor-col-resize bg-gray-100 hover:bg-cyan-200 ${isMaximized ? 'hidden' : ''}`}></div>

        {/* --- Right Pane: Preview --- */}
        <div className={`flex flex-col ${isMaximized ? 'w-full' : 'w-1/2'}`}>
          {/* ... (The rest of your preview pane code is perfect and needs no changes) ... */}
          <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
            <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-gray-500 hover:bg-gray-100">
              <span>v4.1.15</span>
              <FiChevronDown className="h-4 w-4" />
            </button>
            <div className="flex items-center rounded-md border border-gray-200">
              <button onClick={() => handleViewChange('smartphone', '375px')} className={`p-2 hover:bg-gray-100 ${activeView === 'smartphone' ? 'text-cyan-500' : 'text-gray-500'}`}><FiSmartphone /></button>
              <button onClick={() => handleViewChange('tablet', '768px')} className={`border-l border-gray-200 p-2 hover:bg-gray-100 ${activeView === 'tablet' ? 'text-cyan-500' : 'text-gray-500'}`}><FiTablet /></button>
              <button onClick={() => handleViewChange('monitor', '100%')} className={`border-l border-gray-200 p-2 ${activeView === 'monitor' ? 'text-cyan-500 bg-cyan-50' : 'text-gray-500 hover:bg-gray-100'}`}><FiMonitor /></button>
              <button onClick={() => setIsMaximized(!isMaximized)} className="border-l border-gray-200 p-2 text-gray-500 hover:bg-gray-100">
                {isMaximized ? <FiMinimize /> : <FiMaximize />}
              </button>
            </div>
          </div>
          
          <div className="flex flex-1 items-center justify-center bg-gray-100 p-4 overflow-auto">
            <div 
              className="h-full rounded-md bg-white p-2 shadow-inner transition-all duration-300 ease-in-out"
              style={{ width: previewWidth }}
            >
              <div className="mb-2 text-center text-xs text-gray-400 shrink-0">1078 × 839 (60%)</div>
              <div className="relative h-full w-full">
                <iframe
                  srcDoc={createSrcDoc(htmlCode)}
                  title="preview"
                  sandbox="allow-scripts"
                  className="h-full w-full border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditorComponent; // Export the renamed component