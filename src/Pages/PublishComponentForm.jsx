import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { toPng } from 'html-to-image';
// FiBox icon is no longer needed
import { FiTag, FiType, FiEye, FiCheckCircle, FiX } from 'react-icons/fi';
import Header from '../Components/Header';

// --- Helper function and other components (Unchanged) ---
const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
    if (e.key === 'Enter' || e.key === ',') {
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  return (
    <div>
      <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
        <FiTag className="text-gray-400" />
        Tags
      </label>
      <div className="flex flex-wrap items-center gap-2 w-full rounded-md border border-gray-300 p-2 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-cyan-100 text-cyan-800 text-sm font-semibold px-2 py-1 rounded-md">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-cyan-800 hover:text-cyan-900">
              <FiX size={14} />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="flex-grow bg-transparent p-1 outline-none text-sm"
        />
      </div>
       <p className="text-xs text-gray-500 mt-2">Press Enter or comma (,) to add a tag.</p>
    </div>
  );
};

const FormInput = ({ icon, label, placeholder, value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
      {icon}
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-3 focus:border-cyan-500 focus:ring-cyan-500 transition"
    />
  </div>
);

// --- Main Form ---
const PublishComponentForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const passedCode = decodeURIComponent(queryParams.get('code') || '<div class="h-full flex items-center justify-center text-red-500">No code provided.</div>');

  const [componentName, setComponentName] = useState('');
  const [tags, setTags] = useState([]);
  // --- REMOVED: Framework state is no longer needed ---
  // const [framework, setFramework] = useState('react');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... (Validation and user checks remain the same)
    if (!componentName.trim() || tags.length === 0 || !user) {
      alert('Please fill out all fields and ensure you are signed in.');
      return;
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
        alert("Your email address could not be found.");
        return;
    }
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    if (!apiKey) {
        setError("Configuration error: API Key is missing.");
        return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!previewRef.current) {
        throw new Error("Preview element could not be found for image capture.");
      }

      const imageUrl = await toPng(previewRef.current, { 
          cacheBust: true,
          backgroundColor: '#ffffff',
          pixelRatio: 2
      });

      // --- SIMPLIFIED: finalCode is always the passedCode now ---
      const finalCode = passedCode;

      const componentData = {
        name: componentName,
        tags: tags,
        framework: 'html', // --- Hardcoded to 'html' ---
        code: finalCode,
        authorEmail: userEmail,
        imageUrl: imageUrl,
        views: 0,
      };

      const payload = {
        API_KEY: apiKey,
        db_name: 'MechaUI',
        collection_name: 'Components',
        document: componentData,
      };

      const response = await fetch('https://projects-api-three.vercel.app/DBMS/add_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorBody}`);
      }

      await response.json();
      
      navigate('/dashboard');

    } catch (err) {
      setError('Failed to publish component. Please try again.');
      console.error('Error publishing component:', err);
      alert(`Error: Failed to publish component. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
            {/* --- Form Inputs --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                icon={<FiType className="text-gray-400" />}
                label="Component Name"
                placeholder="e.g., Dark Minimal Navbar"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
              />
              <TagsInput tags={tags} setTags={setTags} />
            </div>

            {/* --- REMOVED: Framework selection UI is gone --- */}
            
            {/* --- Live Preview Section --- */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <FiEye className="text-gray-400" />
                Component Preview
              </label>
              <div
                ref={previewRef}
                className="w-full h-60 bg-white rounded-lg p-4 border border-gray-200 overflow-y-auto"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: passedCode }}
                />
              </div>
               <p className="text-xs text-gray-500 mt-2">
                This component will be published as <span className="font-semibold">Tailwind HTML</span>.
              </p>
            </div>

            {/* --- Submission Area --- */}
            <div className="border-t border-gray-200 pt-6 flex items-center justify-end gap-4">
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50">
                <FiCheckCircle />
                {loading ? 'Publishing...' : 'Publish Component'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default PublishComponentForm;