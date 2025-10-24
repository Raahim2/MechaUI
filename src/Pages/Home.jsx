import React, { useState } from 'react';
import LandingHero from "../Components/LandingHero"
import Showcase from '../Components/Showcase';
import { FeaturesSection } from '../Components/FeatureSection';
import { ComponentsGallery } from '../Components/ComponentsGallery';
import { Ending } from '../Components/Ending';

export default function Home() {

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* --- Header --- */}
            <header className="absolute top-0 left-0 w-full z-30 bg-white">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">MechaUI</h1>
                    <nav>
                        <a href="/sign-in" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors">
                            Sign In
                        </a>
                        <a href="/sign-up" className="ml-2 px-4 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-sm">
                            Sign Up Free
                        </a>
                    </nav>
                </div>
            </header>

            <LandingHero/>



            <ComponentsGallery/>

            <Showcase/>


            <FeaturesSection/>


            <Ending/>




            {/* --- Footer --- */}
            {/* <footer className="bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MechaUI. All Rights Reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/about" className="text-sm text-gray-600 hover:text-cyan-600">About</a>
                        <a href="/contact" className="text-sm text-gray-600 hover:text-cyan-600">Contact</a>
                        <a href="/privacy" className="text-sm text-gray-600 hover:text-cyan-600">Privacy Policy</a>
                    </div>
                </div>
            </footer> */}
        </div>
    );
}