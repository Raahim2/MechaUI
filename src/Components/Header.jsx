import React from 'react'; // Import React
import { UserButton, useUser } from "@clerk/clerk-react";

// The Nav component is well-defined and can be used as a sub-component.
const Nav = () => {
  const links = [
    { name: "Applications", active: true },
    { name: "Team" },
    { name: "Settings" },
    { name: "Billing" },
  ];

  return (
    <div className="container mx-auto px-6">
      <nav className="-mb-px flex space-x-8">
        {links.map((link) => (
          <a
            key={link.name}
            href="#"
            className={`border-b-2 py-3 font-semibold ${
              link.active ? "border-black text-gray-800" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

// --- FIX APPLIED HERE ---
const Header = ({ children }) => {
  // Hooks must be called at the top level of the component function.
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return null; // Or return a loading spinner, or a different header version
  }

  return (
     <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* UserButton will not render if the user is not signed in */}
            <UserButton />
            {/* Use user's full name, first name, or a fallback */}
            <span className="font-semibold">{user?.fullName || "Personal Workspace"}</span>
            {/* <FiChevronDown className="h-5 w-5 text-gray-500" /> */}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {children}
        </div>
      </div>
      {/* <Nav /> */}
    </header>
  );
};

export default Header;