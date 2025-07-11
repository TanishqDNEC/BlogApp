import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className="inline-block px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
