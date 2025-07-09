import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import service from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await service.login(data);
            if (session) {
                const userData = await service.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 transition-all duration-300">
            <div className="mx-auto w-full max-w-lg bg-white dark:bg-zinc-800 rounded-xl p-10 border border-gray-200 dark:border-zinc-700 shadow-xl">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Sign in to your account</h2>

                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Sign up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-500 mt-6 text-center text-sm font-medium">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
                    <Input
                        label ="Email:"
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
                        className="w-full hover:bg-blue-700 transition duration-200"
                        children={"Sign In"}
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
