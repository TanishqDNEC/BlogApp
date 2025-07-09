import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900 transition-colors">
            <Container>
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="relative mb-6">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-600"
                                        className="hover:bg-green-700 transition-colors"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600"
                                    className="hover:bg-red-700 transition-colors"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
                    <div className="prose dark:prose-invert max-w-none prose-headings:mb-2 prose-p:mb-3 prose-img:rounded-xl prose-img:my-4">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
