import { cn } from "../../lib/utils"; // Make sure this path is correct
// Import icons from the 'react-icons' library
import {
  FaTerminal,
  FaMagic,
  FaDollarSign,
  FaPalette, // Changed from FaCloud for "Customization"
  FaSitemap,
  FaQuestionCircle,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

export function FeaturesSection() {
  // Rewritten features to be specific to a UI component library
  const features = [
    {
      title: "Developer-Centric",
      description:
        "Built with developers in mind. Clean code, comprehensive documentation, and easy integration with modern frameworks.",
      icon: <FaTerminal size={24} />,
    },
    {
      title: "Copy & Paste Ready",
      description:
        "Simply copy the code for any component and paste it into your project. Go from idea to a beautiful UI in minutes.",
      icon: <FaMagic size={24} />,
    },
    {
      title: "Free & Open Source",
      description:
        "Completely free for personal and commercial use. Fork it, customize it, and build amazing things without worrying about licensing.",
      icon: <FaDollarSign size={24} />,
    },
    {
      title: "Highly Customizable",
      description:
        "Built on Tailwind CSS, making it incredibly easy to customize colors, spacing, and styles to match your brand's unique identity.",
      icon: <FaPalette size={24} />, // Icon updated to better match the theme
    },
    {
      title: "Framework Agnostic",
      description:
        "Designed to work seamlessly with your favorite frameworks like Next.js, Vite, Remix, and more. Drop components in anywhere.",
      icon: <FaSitemap size={24} />,
    },
    {
      title: "Community Driven",
      description:
        "Have a question or a new idea? Join our active community on Discord and contribute on GitHub. We're building this together.",
      icon: <FaQuestionCircle size={24} />,
    },
    {
      title: "Accessible Components",
      description:
        "Committed to accessibility standards (WAI-ARIA) to ensure your applications are usable by everyone, right out of the box.",
      icon: <FaShieldAlt size={24} />,
    },
    {
      title: "Beautifully Designed",
      description:
        "Meticulously crafted components that are not only functional but also aesthetically pleasing, elevating your user experience.",
      icon: <FaHeart size={24} />,
    },
  ];

  return (
    // Wrapper div with a pure white background and padding
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Centered Heading and Subheading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to build beautiful interfaces
          </p>
        </div>

        {/* The original feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// The Feature sub-component remains unchanged structurally.
const Feature = ({
  title,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className={cn(
        "border-b border-gray-150 flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};