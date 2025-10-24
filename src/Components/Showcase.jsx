import React from 'react';

import { ComponentCard } from "../Components/ComponentCard";


const Showcase = () => {
  const dummyComponents = [
  {
    name: "3D Hero Section",
    tags: ["UI", "Landing Page", "Header"],
    views: "15.2k",
    stack: ["react", "tailwind"],
    imageUrl: "https://placehold.co/600x400/7e22ce/FFFFFF/png?text=Hero",
    redirect: "hero-section",
  },
  {
    name: "Interactive Login Form",
    tags: ["Form", "Auth", "UI"],
    views: "11.8k",
    stack: ["react", "tailwind", "html"],
    imageUrl: "https://placehold.co/600x400/16a34a/FFFFFF/png?text=Login",
    redirect: "login-form",
  },
  {
    name: "Animated Pricing Table",
    tags: ["Pricing", "SaaS", "Table"],
    views: "22.1k",
    stack: ["html", "tailwind", "css"],
    imageUrl: "https://placehold.co/600x400/be123c/FFFFFF/png?text=Pricing",
    redirect: "pricing-table",
  },
  {
    name: "Glassmorphism Dashboard",
    tags: ["UI", "Dashboard", "Modern"],
    views: "8.9k",
    stack: ["react", "tailwind", "css"],
    imageUrl: "https://placehold.co/600x400/0284c7/FFFFFF/png?text=Dashboard",
    redirect: "glass-dashboard",
  },
  {
    name: "Parallax Feature Grid",
    tags: ["Grid", "Landing Page", "Layout"],
    views: "19.4k",
    stack: ["react", "tailwind"],
    imageUrl: "https://placehold.co/600x400/c2410c/FFFFFF/png?text=Features",
    redirect: "feature-grid",
  },
];

  return (
    <div className="bg-white py-12 border-b border-gray-150">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">Showcase</h2>
        <p className="text-lg text-gray-600 mb-8">
          Built by the community, powered by our components
        </p>

        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        >
          <div className="flex w-max animate-scroll-ltr">
             {[...dummyComponents, ...dummyComponents].map((component, index) => (
            <div key={index} className="flex-shrink-0 mx-4" style={{ width: '400px' }}>
              <ComponentCard
                name={component.name}
                tags={component.tags}
                views={component.views}
                stack={component.stack}
                imageUrl={component.imageUrl}
                redirect={component.redirect}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;