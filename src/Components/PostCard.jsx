import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const imageId = typeof featuredImage === 'string'
        ? featuredImage
        : featuredImage?.fileId || '';

    const imageUrl = imageId ? service.getFilePreview(imageId) : '';

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200 ease-in-out">
                <div className="w-full justify-center mb-4">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;
