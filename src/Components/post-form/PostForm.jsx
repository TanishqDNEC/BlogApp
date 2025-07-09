import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Permission, Role } from 'appwrite';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth?.userData);
    const [previewImage, setPreviewImage] = useState(post ? service.getFilePreview(post.featuredImage) : null);

    const submit = async (data) => {
        const permissions = [Permission.read(Role.any())];

        if (post) {
            const file = data.image[0]
                ? await service.uploadFile(data.image[0], permissions)
                : null;

            if (file) {
                await service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await service.uploadFile(data.image[0], permissions);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransForm = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransForm(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransForm, setValue]);

    useEffect(() => {
        return () => {
            if (typeof previewImage === 'string' && previewImage.startsWith('blob:')) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap bg-white dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden p-6 w-full max-w-6xl mx-auto"
        >
            {/* Left Section */}
            <div className="w-full md:w-2/3 px-2 space-y-4">
                <Input
                    label="Title:"
                    placeholder="Enter post title"
                    className="mb-2"
                    {...register('title', { required: true })}
                />

                <Input
                    label="Slug:"
                    placeholder="Auto-generated or custom slug"
                    className="mb-2"
                    {...register('slug', { required: true })}
                    onInput={(e) =>
                        setValue('slug', slugTransForm(e.currentTarget.value), { shouldValidate: true })
                    }
                />

                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/3 px-2 space-y-4 mt-6 md:mt-0">
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-2"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                        }
                    }}
                />

                {typeof previewImage === 'string' && (
                    <div className="w-full mb-2">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="rounded-lg max-h-52 object-cover border border-zinc-700"
                        />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-2"
                    {...register('status', { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-600' : 'bg-indigo-600'}
                    className="w-full py-2 rounded-lg text-white font-semibold transition-transform hover:scale-105 hover:brightness-110"
                    children={post ? 'Update Post' : 'Create Post'}
                />
            </div>
        </form>
    );
}

export default PostForm;
