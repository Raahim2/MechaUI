// PreviewPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiSave } from 'react-icons/fi';

export default function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      // First, check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);

      // Fetch the project code. RLS ensures they can only get their own.
      const { data, error } = await supabase
        .from('projects')
        .select('code')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        setError('Project not found or you do not have permission to view it.');
      } else {
        setCode(data.code);
      }
      setIsLoading(false);
    };

    fetchProject();
  }, [id, navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('projects')
      .update({ code: code })
      .eq('id', id);
    
    if (error) {
      alert('Failed to save changes.');
    } else {
      // Show a temporary success message
      setTimeout(() => setIsSaving(false), 1500);
    }
  };

  const iframeContent = `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="">
        ${code}
      </body>
    </html>
  `;

  if (isLoading) return <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center"><p>Loading Project...</p></div>;
  if (error) return <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center"><p>{error}</p></div>;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#030303]">
      {/* Header */}
      <header className="flex-shrink-0 bg-[#1a1a1a] border-b border-gray-700 flex justify-between items-center p-3 text-white">
        <h1 className="text-lg font-bold">Live Preview Editor</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-[#f25f30] rounded-md hover:bg-[#e15328] transition-colors disabled:opacity-60"
          >
            <FiSave />
            {isSaving ? 'Saved!' : 'Save'}
          </button>
          <button onClick={() => window.close()} className="text-sm text-gray-400 hover:text-white">&times; Close</button>
        </div>
      </header>
      {/* Main Split View */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Code Editor */}
        <div className="h-full flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#030303] text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>
        {/* UI Preview */}
        <div className="h-full bg-white border-l border-gray-700">
          <iframe
            srcDoc={iframeContent}
            title="Component Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}