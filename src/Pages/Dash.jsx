// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiPlus, FiSettings, FiLogOut, FiMoreVertical, FiTrash2, FiEdit } from 'react-icons/fi';

// --- Helper Function to format time ---
function formatDistanceToNow(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}


// --- Sub-components for better organization ---

const ProjectCard = ({ project, index, onDelete, onUpdateName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(project.name || 'Untitled Project');

  // Create the full HTML document for the iframe preview
  const iframeContent = `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { display: flex; align-items: center; justify-content: center; background-color: transparent; padding: 0.5rem; }
        </style>
      </head>
      <body>
        ${project.code}
      </body>
    </html>
  `;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete "${project.name || 'this project'}"?`)) {
      onDelete(project.id);
    }
    setMenuOpen(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditingName(true);
    setMenuOpen(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSave = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onUpdateName(project.id, newName);
      setIsEditingName(false);
    }
  };

  const handleBlurSave = () => {
    // Only save if the name has actually changed to avoid unnecessary API calls
    if (newName !== project.name) {
      onUpdateName(project.id, newName);
    }
    setIsEditingName(false);
  };

  return (
    <Link 
      to={`/preview/${project.id}`}
      className="group relative flex flex-col bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-[#f25f30] transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Live UI Preview */}
      <div className="relative flex-grow h-48 bg-white/5 flex items-center justify-center p-2 overflow-hidden">
        <iframe
          srcDoc={iframeContent}
          title={project.name}
          sandbox="allow-scripts"
          scrolling="no"
          className="w-full h-full border-0 pointer-events-none transform scale-[0.8] origin-center"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4 border-t border-gray-700/50">
        {isEditingName ? (
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onKeyDown={handleNameSave}
            onBlur={handleBlurSave}
            className="w-full bg-gray-700 text-white font-bold text-lg rounded px-2 py-1 outline-none ring-2 ring-[#f25f30]"
            autoFocus
            onClick={(e) => e.preventDefault()} // Prevent link navigation when clicking input
          />
        ) : (
          <h3 className="font-bold text-lg text-white truncate">{project.name || 'Untitled Project'}</h3>
        )}
        <p className="text-sm text-gray-400">Created {formatDistanceToNow(project.created_at)}</p>
      </div>

      {/* More Actions Menu */}
      <div className="absolute top-3 right-3 z-10">
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen(!menuOpen); }} className="p-1.5 rounded-full bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white transition-colors">
          <FiMoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg py-1 z-20">
            <button onClick={handleEditClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50">
              <FiEdit className="mr-3" /> Rename
            </button>
            <button onClick={handleDeleteClick} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50">
              <FiTrash2 className="mr-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

const CreateNewProjectCard = ({ index }) => (
  <Link 
    to="/chat"
    className="group flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-gray-700 rounded-lg text-gray-500 hover:border-[#f25f30] hover:text-[#f25f30] transition-all duration-300 min-h-[256px]"
  >
    <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
      <FiPlus className="h-12 w-12 mx-auto" />
      <span className="mt-2 font-bold text-lg">New Project</span>
    </div>
  </Link>
);

const SkeletonCard = () => (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 animate-pulse">
        <div className="h-48 bg-gray-700/50"></div>
        <div className="p-4 border-t border-gray-700/50">
            <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded mt-2"></div>
        </div>
    </div>
);


// --- Main Dashboard Component ---

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication logic
  useEffect(() => {
    const session = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        navigate('/');
      }
    });

    supabase.auth.getUser().then(({ data: { user }}) => {
      if (!user) {
        navigate('/');
      } else {
        setUser(user);
      }
    });

    return () => {
      session.data.subscription.unsubscribe();
    };
  }, [navigate]);

  // Data fetching logic
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, [user]);

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Delete project handler
  const handleDeleteProject = async (projectId) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
    } else {
      setProjects(currentProjects => currentProjects.filter(p => p.id !== projectId));
    }
  };

  // Update Project Name Handler
  const handleUpdateProjectName = async (projectId, newName) => {
    setProjects(currentProjects => 
      currentProjects.map(p => 
        p.id === projectId ? { ...p, name: newName } : p
      )
    );
    
    const { error } = await supabase
      .from('projects')
      .update({ name: newName })
      .eq('id', projectId);
    
    if (error) {
      console.error('Error updating project name:', error);
      alert('Failed to update project name.');
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-[#030303]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_rgba(255,255,255,0)_40%)] text-white font-sans">
      
      <header className="sticky top-0 bg-[#030303]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <nav className="container mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/">
            <img src={'/mecha.svg'} alt="Mecha Logo" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative group">
               <button className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border-2 border-gray-700 group-hover:border-[#f25f30] transition-colors">
                  <span className="font-bold text-lg text-[#f25f30]">
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </span> 
               </button>
               <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible translate-y-2 group-hover:translate-y-0 z-20">
                  <Link to="/settings" className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50">
                     <FiSettings className="mr-3" /> Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50">
                     <FiLogOut className="mr-3" /> Logout
                  </button>
               </div>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="mt-1 text-gray-400">Welcome back, {user.email}</p>
            </div>
            <Link 
              to="/chat"
              className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-[#f25f30] rounded-lg hover:bg-[#e15328] transition-all duration-200 transform hover:scale-105 shadow-[0_0_20px_rgba(242,95,48,0.2)]"
            >
              <FiPlus />
              New Project
            </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CreateNewProjectCard index={0} />
          
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index + 1} 
                onDelete={handleDeleteProject}
                onUpdateName={handleUpdateProjectName}
              />
            ))
          )}
        </div>
        
        {!isLoading && projects.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
            <h3 className="text-xl font-semibold text-gray-300">No projects yet!</h3>
            <p className="text-gray-500 mt-2">Click on "New Project" to generate your first UI component.</p>
          </div>
        )}
      </main>
    </div>
  );
}