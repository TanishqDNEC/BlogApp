import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../Components';
import service from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <Container>
                <h1 className="text-3xl font-semibold mb-8 text-center">
                    Edit Your Post
                </h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xl">
            Loading post...
        </div>
    );
}

export default EditPost;
