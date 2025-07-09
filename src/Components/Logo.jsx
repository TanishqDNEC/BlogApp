import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ width = '100px' }) {
    return (
        <Link to="/" className="flex items-center space-x-2 group">
            {/* Placeholder logo image block */}
            <div
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform"
                style={{ width, height: width }}
            >
                <span>Tangs</span>
            </div>

            {/* Text beside logo */}
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Fake Blog Gang
            </h1>
        </Link>
    );
}

export default Logo;
