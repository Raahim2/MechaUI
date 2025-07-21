import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as AllIcons from 'react-icons/fi';
import '../CSS/Chat.css';

export const PreviewPage = () => {
    const { id } = useParams();
    const [rawJsx, setRawJsx] = useState(''); // The original, un-edited code from the AI
    const [css, setCss] = useState('');
    const [error, setError] = useState('');

    const [renderableCode, setRenderableCode] = useState(''); // The sanitized, executable code

    useEffect(() => {
        try {
            const storedContent = localStorage.getItem(`preview-${id}`);
            if (storedContent) {
                const { jsx, css } = JSON.parse(storedContent);
                setRawJsx(jsx || '');
                setCss(css || '');
            } else {
                setError('Preview not found. It might have expired or the link is invalid.');
            }
        } catch (e) {
            setError('Could not load the preview content.');
        }
    }, [id]);

    useEffect(() => {
        if (!rawJsx) return;
        setError('');

        // 1. SANITIZE: Remove all module syntax (import, require, exports). This is now a complete sanitizer.
        const cleanedJsx = rawJsx
            // ** NEW FIX: Removes all `import` statements **
            .replace(/^import\s+.*?\s+from\s+['"].*['"];?/gm, '')
            // Removes CommonJS `require` statements
            .replace(/(?:const|var|let)\s*\{?[\w\s,]+}?\}\s*=\s*require\(.+\);?/gm, '')
            // Removes `export default ...`
            .replace(/^export\s+default\s+[\w\s;]+$/gm, '')
            // Removes `module.exports = ...`
            .replace(/^module\.exports\s*=\s*.*/gm, '')
            .trim();

        // 2. IDENTIFY: Find the component name in the *cleaned* code
        const componentNameMatch = cleanedJsx.match(/(?:const|function)\s+([A-Z]\w*)/);
        const componentName = componentNameMatch ? componentNameMatch[1] : null;

        if (componentName) {
            // 3. PREPARE FOR RENDER: Append the required `render` call
            const finalCode = `${cleanedJsx}\n\nrender(<${componentName} />);`;
            setRenderableCode(finalCode);
        } else {
            setRenderableCode(cleanedJsx);
            if(cleanedJsx) {
                setError("Error: Could not identify a main component to render in the generated code.");
            }
        }
    }, [rawJsx]);

    // Inject any custom CSS into the page for the preview
    useEffect(() => {
        if (!css) return;
        const styleTag = document.createElement('style');
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, [css]);

    const liveScope = {
        React,
        useState,
        useEffect,
        useRef,
        useCallback,
        useMemo,
        ...AllIcons,
        render: (node) => {},
    };

    return (
        <div className="preview-page-container">
            <header className="preview-header">
                <h1>Live Component Preview</h1>
                <Link to="/" className="back-link">← Back to Chat</Link>
            </header>
            <main className="preview-main-split">
                <LiveProvider code={renderableCode} scope={liveScope} noInline={true}>
                    <div className="preview-render-area">
                        <h2 className="preview-area-title">Live Preview</h2>
                        <div className="preview-frame">
                           <LivePreview />
                        </div>
                        <div className="preview-error-box">
                           <LiveError />
                        </div>
                    </div>
                    <div className="preview-code-area">
                        <h2 className="preview-area-title">Editable Code</h2>
                        <LiveEditor
                            onChange={(newCode) => setRawJsx(newCode)}
                            value={rawJsx}
                            className="live-editor"
                        />
                       
                    </div>
                </LiveProvider>
            </main>
            {error && <div className="error-message full-page-error">{error}</div>}
        </div>
    );
};