import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard, Button } from '../Components';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            service
                .getPosts([
                    Query.equal("status", "active"),
                    Query.equal("userId", userData.$id),
                ])
                .then((response) => {
                    if (response) {
                        setPosts(response.documents);
                    }
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className="text-center mt-10 text-lg font-medium text-gray-600">
                Loading...
            </div>
        );
    }

    if (!userData) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-2xl font-bold text-gray-700'>
                        Login to Read Posts
                    </h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-xl font-medium text-gray-600 mb-4'>
                        You haven’t posted anything yet!
                    </h1>
                    <Button
                        children="Create Your First Post"
                        className="mx-auto"
                        onClick={() => navigate('/add-post')}
                    />
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
