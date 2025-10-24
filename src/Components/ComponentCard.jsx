"use client";
import React from "react";
import { cn } from "../../lib/utils"; // Make sure this path is correct
import { SiReact, SiTailwindcss, SiHtml5, SiCss3 } from "react-icons/si";
import { FiEye } from "react-icons/fi"; // Added for the views icon

const MouseEnterContext = React.createContext(undefined);

// --- *** CORRECTED CardContainer *** ---
// Now accepts and applies extra props like onClick
export const CardContainer = ({ children, className, containerClassName, ...rest }) => {
  const containerRef = React.useRef(null);
  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      {/* The "...rest" here applies any extra props (like onClick) to this div */}
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
        {...rest}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};


// --- CardBody, CardItem, and useMouseEnter (Unchanged) ---
export const CardBody = ({ children, className }) => (
  <div className={cn("h-auto w-auto [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>
    {children}
  </div>
);

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = React.useRef(null);
  const [isMouseEntered] = useMouseEnter();

  React.useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = React.useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// --- Helper for stack icons (Unchanged) ---
const iconMap = {
  react: <SiReact title="React" className="text-sky-500" />,
  tailwind: <SiTailwindcss title="Tailwind CSS" className="text-teal-400" />,
  html: <SiHtml5 title="HTML5" className="text-orange-500" />,
  css: <SiCss3 title="CSS3" className="text-blue-500" />,
};

export function ComponentCard({
  name,
  tags,
  views,
  stack,
  imageUrl,
  redirect // The URL string to navigate to
}) {
  const handleRedirect = () => {
    console.log("jo"); // This will now work!
    if (redirect) {
      window.location.href = "component/"+redirect;
    }
  };

  return (
    <CardContainer containerClassName="cursor-pointer" onClick={handleRedirect}>
      <CardBody className="group/card relative h-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        
        {/* --- Image Section --- */}
        <CardItem translateZ="50" className="w-full">
          <img
            src={imageUrl}
            className="h-52 w-full rounded-lg object-cover"
            alt={`Preview of ${name}`}
          />
        </CardItem>

        {/* --- Name Section --- */}
        <CardItem translateZ="40" className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        </CardItem>
        
        {/* --- Tags Section --- */}
        <CardItem translateZ="30" className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardItem>

        {/* --- Footer Section --- */}
        <div className="mt-8 flex items-center justify-between">
          <CardItem translateZ="20" className="flex items-center gap-3 text-3xl">
            {stack?.map((tech) => iconMap[tech.toLowerCase()] || null)}
          </CardItem>

          <CardItem translateZ="20" className="flex items-center gap-2 text-gray-500">
            <FiEye className="h-5 w-5" />
            <span className="text-sm font-medium">{views ?? 0}</span>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}