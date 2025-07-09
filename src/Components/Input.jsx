import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label
                    className='block mb-1 pl-1 text-gray-800 dark:text-gray-200 font-medium'
                    htmlFor={id} // use generated ID instead of props.id
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                className={`
                    px-3 py-2 rounded-lg
                    bg-white dark:bg-gray-800
                    text-black dark:text-white
                    outline-none focus:bg-gray-50 dark:focus:bg-gray-700
                    duration-200 border border-gray-300 dark:border-gray-600
                    w-full
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default Input;
