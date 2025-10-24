"use client";

import { motion } from "motion/react";
import { cn } from "../../lib/utils";
export const ThreeDMarquee = ({
  images,
  className
}) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });
  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className
      )}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d">
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8">
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700} />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "200px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};

const GridLineVertical = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "150px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};


export function ComponentsGallery() {
  const images = [
    
    "https://flowbite.com/images/components/banner.svg",
    "https://flowbite.com/images/components/gallery.svg",
    "https://flowbite.com/images/components/jumbotron.svg",
    "https://flowbite.com/images/components/charts.svg",
    "https://flowbite.com/images/components/clipboard.svg",
    "https://flowbite.com/images/components/device-mockups.svg",
    "https://flowbite.com/images/components/video.svg",
    "https://flowbite.com/images/components/datepicker.svg",
    "https://flowbite.com/images/components/rating.svg",
    "https://flowbite.com/images/components/typography.svg",
    "https://flowbite.com/images/components/navbar.svg",
    "https://flowbite.com/images/components/carousel.svg",
    "https://flowbite.com/images/components/breadcrumbs.svg",
    "https://flowbite.com/images/components/avatar.svg",

     "https://flowbite.com/images/components/banner.svg",
    "https://flowbite.com/images/components/gallery.svg",
    "https://flowbite.com/images/components/jumbotron.svg",
    "https://flowbite.com/images/components/charts.svg",
    "https://flowbite.com/images/components/clipboard.svg",
    "https://flowbite.com/images/components/device-mockups.svg",
    "https://flowbite.com/images/components/video.svg",
    "https://flowbite.com/images/components/datepicker.svg",
    "https://flowbite.com/images/components/rating.svg",
    "https://flowbite.com/images/components/typography.svg",
    "https://flowbite.com/images/components/navbar.svg",
    "https://flowbite.com/images/components/carousel.svg",
    "https://flowbite.com/images/components/breadcrumbs.svg",
    "https://flowbite.com/images/components/avatar.svg",

     "https://flowbite.com/images/components/banner.svg",
    "https://flowbite.com/images/components/gallery.svg",
    "https://flowbite.com/images/components/jumbotron.svg",
    "https://flowbite.com/images/components/charts.svg",
    "https://flowbite.com/images/components/clipboard.svg",
    "https://flowbite.com/images/components/device-mockups.svg",
    "https://flowbite.com/images/components/video.svg",
    "https://flowbite.com/images/components/datepicker.svg",
    "https://flowbite.com/images/components/rating.svg",
    "https://flowbite.com/images/components/typography.svg",
    "https://flowbite.com/images/components/navbar.svg",
    "https://flowbite.com/images/components/carousel.svg",
    "https://flowbite.com/images/components/breadcrumbs.svg",
    "https://flowbite.com/images/components/avatar.svg",




   
    
    
  ];
  
  return (
    <>
        <div className="bg-white py-12 border-b border-gray-150">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-2">Gallery</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready-made components to speed up your build.
            </p>
    
          <div
      className="mx-auto my-10 max-w-7xl rounded-3xl bg-white p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>

    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
    <span>
      Browse Components
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
          </div>
        </div>

            
    </>

  );
}

