import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    if (loader) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 transition-all duration-300">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
                    Loading...
                </h1>
            </div>
        );
    }

    return <>{children}</>;
}
