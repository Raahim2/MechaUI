"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiAlertCircle, FiSearch } from 'react-icons/fi';

// Make sure this path is correct for your project structure
import { ComponentCard } from '../Components/ComponentCard'; 

// ====================================================================
// 1. API Service Logic (Handles fetching data)
// ====================================================================
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const fetchComponentsAPI = async (query = "") => {
    const endpoint = "https://projects-api-three.vercel.app/DBMS/fetch";
    let filter_condition = {};

    if (query) {
        filter_condition = {
            "$or": [
                { "name": { "$regex": query, "$options": "i" } },
                { "description": { "$regex": query, "$options": "i" } },
                { "tags": { "$regex": query, "$options": "i" } }
            ]
        };
    }

    const payload = {
        "API_KEY": API_KEY,
        "db_name": "MechaUI",
        "collection_name": "Components",
        "filter_condition": filter_condition
    };
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        
        // --- *** THE FIX IS HERE *** ---
        // The API returns a direct array, so we return it directly.
        return data || []; 

    } catch (error) {
        console.error("Failed to fetch components:", error);
        throw error;
    }
};

// --- Header Component (Now accepts children) ---
const Header = ({ children }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
                Mecha<span className="text-cyan-600">UI</span>
            </Link>
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    </header>
);

// --- SearchBar Component (Self-contained logic) ---
const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm) {
            navigate(`/components?q=${trimmedTerm}`);
        } else {
            navigate('/components');
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for components..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch />
            </button>
        </form>
    );
};

// --- Spinner Component ---
const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
    </div>
);

// ====================================================================
// 3. Main Page Component (AllComponents)
// ====================================================================
export default function AllComponents() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || "";
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadComponents = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchComponentsAPI(query);
                setResults(data); // This will now receive the correct array
            } catch (err) {
                setError("Could not fetch components. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadComponents();
    }, [query]);

    const renderContent = () => {
        if (loading) return <Spinner />;

        if (error) {
            return (
                <div className="text-center py-20 text-red-600">
                    <FiAlertCircle className="mx-auto" size={48} />
                    <h2 className="mt-4 text-2xl font-semibold">{error}</h2>
                </div>
            );
        }

        if (results.length === 0 && query) {
            return (
                <div className="text-center py-20">
                    <FiAlertCircle className="mx-auto text-gray-400" size={48} />
                    <h2 className="mt-4 text-2xl font-semibold text-gray-800">No Results Found</h2>
                    <p className="mt-2 text-gray-600">
                        We couldn't find any components matching <span className="font-semibold text-gray-800">"{query}"</span>.
                    </p>
                </div>
            );
        }

        // --- Grid of ComponentCard results ---
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((component) => (
                    <ComponentCard
                        key={component._id}
                        name={component.name}
                        tags={component.tags}
                        imageUrl={component.imageUrl}
                        stack={component.stack || ['react', 'tailwind']}
                        views={component.views}
                        redirect={component._id}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header>
                <SearchBar />
            </Header> 
            
            <main className="container mx-auto px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {query ? 'Search Results' : 'All Components'}
                    </h1>
                    {!loading && (
                         <p className="mt-2 text-lg text-gray-600">
                            {query 
                                ? `Showing ${results.length} results for "${query}"`
                                : 'Browse our collection of beautiful, handcrafted components.'
                            }
                        </p>
                    )}
                </div>
                <div>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}