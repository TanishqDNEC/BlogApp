import React from 'react';
import { PostForm, Container } from '../Components';

function AddPost() {
    return (
        <div className="min-h-screen py-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Container>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-10">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                        Create a New Post
                    </h1>
                    <PostForm />
                </div>
            </Container>
        </div>
    );
}

export default AddPost;
