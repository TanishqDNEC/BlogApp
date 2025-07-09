import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    return (
        <header className="py-4 shadow-md bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 rounded-xl">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <ul className="flex items-center gap-4">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="px-4 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
