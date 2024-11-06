'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TBlog, blogPosts } from '../../_component/module/blogs';

interface TBlogDetailsProps {
  params: { blogId: string };
}

export default function BlogDetailsPage({ params }: TBlogDetailsProps) {
  const router = useRouter();
  const blogId = parseInt(params.blogId);
  const blog = blogPosts.find((post) => post.id === blogId);

  if (!blog) {
    return (
      <div className="p-5 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Blog Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-5 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-4">{blog.title}</h1>
      <p className="text-center text-gray-500 mb-6">
        By {blog.author} | {new Date(blog.date).toLocaleDateString()} |{' '}
        {blog.readTime} read
      </p>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-lg mb-6"
      />

      <p className="text-lg mb-6">{blog.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link href="/blog">
        <button className="mt-5 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
          Back to Blog
        </button>
      </Link>
    </div>
  );
}
