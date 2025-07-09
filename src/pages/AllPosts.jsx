import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../Components';

function AllPosts() {
    const [posts, setPost] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) setPost(posts.documents);
        });
    }, []);

    return (
        <div className="min-h-screen py-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                    All Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
