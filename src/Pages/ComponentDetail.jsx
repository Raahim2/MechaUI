import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClipboard, FiCheck, FiTag, FiAlertTriangle, FiArrowLeft, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import Header from '../Components/Header'; // Make sure this path is correct
import Editor from '@monaco-editor/react';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, onConfirm, title, children, confirmText, confirmClasses, showCancel = true }) => {
    if (!isOpen) return null;

    return (
        // Backdrop
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose} // Close modal on backdrop click
        >
            {/* Modal Content */}
            <div 
                className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-transform duration-300 scale-100"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <div className="text-gray-600">
                    {children}
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    {showCancel && (
                        <button 
                            onClick={onClose} 
                            className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button 
                        onClick={onConfirm} 
                        className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${confirmClasses}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Spinner Component ---
const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
    </div>
);

// --- Main Component Detail Page ---
const ComponentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [componentData, setComponentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // --- Data fetching logic (no changes) ---
    const fetchComponent = useCallback(async () => {
        if (!id || id === 'undefined') {
            setError("No valid component ID found in the URL.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        if (!apiKey) {
            setError("Configuration error: API Key is missing.");
            setLoading(false);
            return;
        }
        const payload = {
            API_KEY: apiKey,
            db_name: 'MechaUI',
            collection_name: 'Components',
            filter_condition: { "_id": id }
        };
        try {
            const response = await fetch('https://projects-api-three.vercel.app/DBMS/fetch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status} (${response.statusText})`);
            }
            const result = await response.json();
            if (Array.isArray(result) && result.length > 0) {
                setComponentData(result[0]);
            } else {
                setError(`No component found with the ID: ${id}`);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchComponent();
    }, [fetchComponent]);

    const handleCopy = () => {
        if (componentData?.code) {
            navigator.clipboard.writeText(componentData.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // --- Step 1: User clicks delete, this opens the confirmation modal ---
    const handleDelete = () => {
        setIsConfirmModalOpen(true);
    };

    // --- Step 2: If user confirms in the modal, this function runs ---
    const executeDelete = async () => {
        setIsConfirmModalOpen(false); // Close confirmation modal
        setIsDeleting(true);
        setError(null);

        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const payload = {
            API_KEY: apiKey,
            db_name: 'MechaUI',
            collection_name: 'Components',
            filter_condition: { "_id": id }
        };

        try {
            const response = await fetch('https://projects-api-three.vercel.app/DBMS/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
                throw new Error(errorData.message || `API request failed with status: ${response.status}`);
            }

            // On success, open the success modal
            setIsSuccessModalOpen(true);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    // --- Step 3: User clicks "OK" in success modal, is navigated away ---
    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        navigate('/dashboard');
    };

    // --- Delete button to be passed to the header ---
    const deleteButton = (
        <button
            onClick={handleDelete}
            disabled={isDeleting || !componentData}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm disabled:bg-red-300 disabled:cursor-not-allowed"
            aria-label="Delete component"
        >
            <FiTrash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </button>
    );

    // --- Loading, Error, and No Data states (no changes) ---
    if (loading) {
        return (
            <>
                <Header>{deleteButton}</Header>
                <div className="bg-gray-50 flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
                    <Spinner />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header>{deleteButton}</Header>
                <div className="bg-gray-50 flex items-center justify-center p-8" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="text-center bg-white p-10 rounded-lg shadow-md border border-red-200 max-w-lg">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                            <FiAlertTriangle className="text-red-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">An Error Occurred</h2>
                        <p className="text-gray-600 mb-6">We ran into an issue. Please check the details below and try again.</p>
                        <div className="text-sm text-red-700 bg-red-50 p-3 rounded-md mb-6 border border-red-200">
                            <strong>Error Details:</strong> {error}
                        </div>
                        <button onClick={fetchComponent} className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                </div>
            </>
        );
    }
  
    if (!componentData) {
        return (
             <>
                <Header>{deleteButton}</Header>
                <div className="bg-gray-50 flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
                    <p>Component data could not be loaded.</p>
                </div>
            </>
        );
    }
  
    // --- Main Component Display ---
    return (
        <>
            <Header>{deleteButton}</Header>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Page Header Section */}
                    <div className="mb-8">
                        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-cyan-600 hover:underline mb-4">
                            <FiArrowLeft />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{componentData.name}</h1>
                        <div className="flex items-center flex-wrap gap-2">
                            <FiTag className="text-gray-400" />
                            {componentData.tags.map(tag => (
                                <span key={tag} className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Main Showcase Container */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                        {/* Preview Area */}
                        <div className="p-8 bg-white rounded-t-xl border-b border-gray-200">
                            <div className="h-[50vh] w-full">
                                <div
                                    className="w-full h-full bg-white shadow-inner rounded-md"
                                    dangerouslySetInnerHTML={{ __html: componentData.code }}
                                />
                            </div>
                        </div>

                        {/* Code Area */}
                        <div>
                            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-50">
                                <h3 className="font-semibold text-gray-700">Code</h3>
                                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md text-gray-600 hover:bg-gray-200 transition" aria-label="Copy code">
                                    {isCopied ? <FiCheck size={16} className="text-green-500" /> : <FiClipboard size={16} />}
                                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                            
                            <div className="rounded-b-xl overflow-hidden">
                                <Editor
                                    height="45vh"
                                    language={componentData.framework === 'react' ? 'javascript' : 'html'}
                                    value={componentData.code}
                                    theme="vs-light"
                                    options={{
                                        readOnly: true,
                                        domReadOnly: true,
                                        contextmenu: false,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        fontSize: 14,
                                        padding: { top: 16 }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals are rendered here --- */}
            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={executeDelete}
                title="Confirm Deletion"
                confirmText="Delete"
                confirmClasses="bg-red-500 hover:bg-red-600"
            >
                <p>Are you sure you want to permanently delete the component <strong>"{componentData?.name}"</strong>? This action cannot be undone.</p>
            </Modal>

            <Modal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
                onConfirm={handleSuccessModalClose}
                title="Success"
                confirmText="OK"
                confirmClasses="bg-cyan-600 hover:bg-cyan-700"
                showCancel={false}
            >
                <div className="flex items-center gap-4">
                    <FiCheckCircle className="text-green-500" size={32} />
                    <p>The component was deleted successfully.</p>
                </div>
            </Modal>
        </>
    );
};

export default ComponentDetail;