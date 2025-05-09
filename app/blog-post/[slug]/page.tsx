"use client";

import Link from "next/link";
import React from 'react';
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'image';
  props: {
    level?: number;
    url?: string;
    caption?: string;
  };
  content?: Array<{ text?: string }>;
}

interface BlogPost {
  id: number;
  title: string;
  content: ContentBlock[];
  author: string;
  cardColor: string;
  coverImage: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const id = Number(params.slug);
        const response = await fetch(
          `https://expressjs-prisma-production-c3ba.up.railway.app/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const post = await response.json();
        setPost(post);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center py-20">
          Loading post...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center py-20 text-red-500">
          Error: {error}
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center py-20">
          Post not found
        </div>
      </section>
    );
  }

  const renderContent = () => {
    return post.content.map((block, index) => {
      switch (block.type) {
        case "heading":
          const level = Math.min(Math.max(block.props.level || 2, 1), 6);
          // const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return React.createElement(
            `h${level}`,
            { key: index, className: "mt-6 mb-4" },
            block.content?.[0]?.text
          );
          
        case "paragraph":
          return (
            <p key={index} className="mb-4">
              {block.content?.[0]?.text}
            </p>
          );
        case "image":
          return (
            <div key={index} className="my-6">
              <Image
                src={block.props.url || ''}
                alt={block.props.caption || ''}
                width={800}
                height={450}
                className="w-full max-h-96 object-contain rounded"
              />
              {block.props.caption && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  {block.props.caption}
                </p>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <section className="py-10">
      <div className="bg-white max-w-6xl mx-auto items-center border shadow-sm rounded-2xl py-6">
        <Link
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-12 group ml-10 sm:ml-36 pt-10"
        >
          <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Blog
        </Link>

        <article className="max-w-4xl mx-auto px-4 py-8">
          {post.coverImage && (
            <div className="w-full flex justify-center items-center mb-6">
              <Image
                src={post.coverImage}
                alt="Post Cover"
                width={1200}
                height={630}
                className="w-auto max-h-96 object-cover rounded"
              />
            </div>
          )}

          <div className="space-y-12">
            <h2 className="text-4xl sm:text-6xl text-left font-thin font-sans text-emerald-600 leading-tight">
              {post.title}
            </h2>

            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="col-span-1 space-y-1">
                <div className="flex flex-col border-t border-black/40 pt-4 w-full">
                  <div className="text-start w-full pb-4">
                    <p className="text-gray-700 text-md font-thin px-1.5 rounded-full">
                      by {post.author}
                    </p>
                  </div>

                  <div className="text-start border-t border-black/40 py-4 w-full">
                    <p className="text-gray-700 text-md font-thin px-1.5 rounded-full">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-start border-t border-black/40 py-4 w-full">
                    <p className="bg-black/10 inline-block px-2 py-1 rounded text-md font-thin">
                      {post.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-3 prose prose-gray max-w-none">
                <hr className="bg-black/40 border-none h-[1px]" />
                <div className="py-4 space-y-4">{renderContent()}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}