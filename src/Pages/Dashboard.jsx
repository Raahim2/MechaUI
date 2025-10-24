import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { FiPlus, FiSearch } from "react-icons/fi"; // Added FiSearch
import { ComponentCard } from "../Components/ComponentCard";
import Header from "../Components/Header";

// This card remains the same
const CreateApplicationCard = ({ onCreate }) => (
    <div 
        className="flex h-full min-h-[350px] w-full max-w-sm cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white transition-colors hover:border-gray-400 hover:bg-gray-50" 
        onClick={onCreate}
    >
        <div className="flex items-center space-x-2 text-lg text-gray-600">
            <FiPlus className="h-5 w-5" />
            <span>Create Component</span>
        </div>
    </div>
);

const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
    </div>
);

// --- Main Applications Page ---
const Applications = () => {
    const { user } = useUser();
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // --- NEW: State for search functionality ---
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredComponents, setFilteredComponents] = useState([]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchComponents = async () => {
            setLoading(true);
            setError(null);

            const userEmail = user.primaryEmailAddress?.emailAddress;
            if (!userEmail) {
                setError("Could not find user email.");
                setLoading(false);
                return;
            }

            const apiKey = import.meta.env.VITE_APP_API_KEY;
            if (!apiKey) {
                setError("API Key is not configured.");
                setLoading(false);
                return;
            }

            const payload = {
                API_KEY: apiKey,
                db_name: 'MechaUI',
                collection_name: 'Components',
                filter_condition: { "authorEmail": userEmail }
            };

            try {
                const response = await fetch('https://projects-api-three.vercel.app/DBMS/fetch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const result = await response.json();
                const componentsArray = Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : [];
                setComponents(componentsArray); 
                setFilteredComponents(componentsArray); // Initially, filtered list is the full list

            } catch (err) {
                console.error("Error fetching components:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComponents();

    }, [user]);

    // --- NEW: useEffect for filtering based on search term ---
    useEffect(() => {
        if (!searchTerm) {
            setFilteredComponents(components); // If search is empty, show all components
            return;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = components.filter(component =>
            component.name.toLowerCase().includes(lowercasedFilter) ||
            (component.tags && component.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter)))
        );
        setFilteredComponents(filtered);
    }, [searchTerm, components]); // Re-run whenever search term or the main component list changes

    const handleCreate = () => {
        window.location.href = "/editor";
    };

    // --- NEW: Search bar element to pass to the header ---
    const searchBar = (
        <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search your components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
        </div>
    );
    
    // --- UPDATED: renderContent now uses filteredComponents ---
    const renderContent = () => {
        if (loading) {
            return <Spinner />;
        }

        if (error) {
            return <p className="text-center text-red-500">Error: {error}</p>;
        }

        return (
            <>
                {/* NEW: No search results message */}
                {components.length > 0 && filteredComponents.length === 0 && (
                    <div className="col-span-full text-center py-10">
                        <FiSearch className="mx-auto text-gray-400" size={48} />
                        <h3 className="mt-4 text-xl font-semibold">No Components Found</h3>
                        <p className="mt-1 text-gray-600">Your search for "{searchTerm}" did not match any components.</p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <CreateApplicationCard onCreate={handleCreate} />
                    
                    {filteredComponents.map((component) => (
                        <ComponentCard 
                            key={component._id}
                            redirect={component._id}
                            name={component.name} 
                            tags={component.tags} 
                            stack={component.framework ? [component.framework] : []} 
                            views={component.views ?? 0} 
                            imageUrl={component.imageUrl || "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&q=80"}
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Pass search bar as a child to the Header */}
            <Header>{searchBar}</Header>
            <main className="container mx-auto p-6 lg:p-8">
                <h1 className="mb-8 text-3xl font-bold">Your Components</h1>
                {renderContent()}
            </main>
        </div>
    );
};

export default Applications;