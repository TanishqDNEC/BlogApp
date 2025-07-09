import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    &copy; {new Date().getFullYear()} All Rights Reserved by Tanishq.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-widest">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {['Foter Links','some More Links','testLinks'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/"
                                            className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-widest">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/"
                                            className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-widest">
                                Legals
                            </h3>
                            <ul className="space-y-3">
                                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/"
                                            className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
