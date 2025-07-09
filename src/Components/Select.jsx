import React, { useId } from 'react';

const Select = React.forwardRef(function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block mb-1 pl-1 text-gray-800 dark:text-gray-200">
                    {label}
                </label>
            )}

            <select
                id={id}
                ref={ref}
                {...props}
                className={`
                    w-full px-4 py-2 rounded-lg
                    bg-white dark:bg-gray-800
                    text-black dark:text-white
                    border border-gray-300 dark:border-gray-600
                    outline-none
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition duration-200 ease-in-out
                    ${className}
                `}
            >
                {options.map((option) => (
                    <option key={option} value={option} className="dark:bg-gray-800 dark:text-white">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
