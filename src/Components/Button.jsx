import React from 'react';

function Button({
    children, // 🔧 Corrected from 'Children'
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-4 py-2 rounded-lg
                ${bgColor} ${textColor}
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition duration-200 ease-in-out
                dark:hover:opacity-80
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
