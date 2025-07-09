import React from 'react';
import { Signup as SignupComponent } from '../Components';

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors px-4 py-10">
            <SignupComponent />
        </div>
    );
}
