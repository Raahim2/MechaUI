import React, { useState, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const techStackOptions = [
    { id: 'react-tailwind', label: 'React + Tailwind' },
    { id: 'react-css', label: 'React + CSS' },
];

export const StartScreen = ({ onStart, isLoading, error }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [activeStack, setActiveStack] = useState(techStackOptions[0]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGenerateClick = () => {
        onStart(imageFile, imagePreview, activeStack);
    };

    return (
        <div className="start-screen">
            <div className="start-content">
                <h1>Image to UI Code Converter</h1>
                <p className="subtitle">Upload a screenshot of a UI and select your desired tech stack to get started.</p>

                <div 
                    className={`upload-area ${imagePreview ? 'has-image' : ''}`}
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    {imagePreview ? (
                        <img src={imagePreview} alt="UI Preview" className="start-image-preview" />
                    ) : (
                        <>
                            <FiUploadCloud size={48} />
                            <span>Click to upload an image</span>
                        </>
                    )}
                </div>

                <h2>Select Tech Stack</h2>
                <div className="tech-stack-options">
                    {techStackOptions.map(option => (
                        <button
                            key={option.id}
                            className={`tech-option-btn ${activeStack.id === option.id ? 'active' : ''}`}
                            onClick={() => setActiveStack(option)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                    className="generate-button"
                    onClick={handleGenerateClick}
                    disabled={!imageFile || isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Code'}
                </button>
            </div>
        </div>
    );
};