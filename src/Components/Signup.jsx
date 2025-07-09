import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
            <div className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-10 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6">
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register("name")}
                        />

                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />

                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            children="Create Account"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
