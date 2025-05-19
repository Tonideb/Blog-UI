"use client";

import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface ContentBlock {
  type:
    | "heading"
    | "paragraph"
    | "image"
    | "quote"
    | "numberedListItem"
    | "bulletListItem"
    | "checkListItem"
    | "video";
  props: {
    level?: number;
    url?: string;
    caption?: string;
    checked?: boolean;
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
  category2: string | null;
  category3: string | null;
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
          const headingClasses = {
            1: "text-4xl font-bold mt-12 mb-6",
            2: "text-3xl font-bold mt-10 mb-5",
            3: "text-2xl font-semibold mt-8 mb-4",
            4: "text-xl font-semibold mt-6 mb-3",
            5: "text-lg font-medium mt-4 mb-2",
            6: "text-base font-medium mt-3 mb-1",
          }[level];

          return React.createElement(
            `h${level}`,
            { key: index, className: headingClasses },
            block.content?.[0]?.text
          );

        case "paragraph":
          // Skip rendering if there's no content
          if (
            !block.content ||
            block.content.length === 0 ||
            !block.content[0]?.text
          ) {
            return <br key={index} className="my-2" />;
          }
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {block.content[0].text}
            </p>
          );

        case "image":
          return (
            <div key={index} className="my-6">
              <Image
                src={block.props.url || ""}
                alt={block.props.caption || ""}
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

        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-emerald-500 pl-4 italic my-6 text-gray-600"
            >
              {block.content?.[0]?.text}
            </blockquote>
          );

        case "numberedListItem":
          return (
            <ol key={index} className="list-decimal list-inside my-2 pl-4">
              <li className="text-gray-700">{block.content?.[0]?.text}</li>
            </ol>
          );

        case "bulletListItem":
          return (
            <ul key={index} className="list-disc list-inside my-2 pl-4">
              <li className="text-gray-700">{block.content?.[0]?.text}</li>
            </ul>
          );

        case "checkListItem":
          return (
            <div key={index} className="flex items-center my-2">
              <input
                type="checkbox"
                checked={block.props.checked || false}
                readOnly
                className="mr-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span
                className={`text-gray-700 ${
                  block.props.checked ? "line-through opacity-70" : ""
                }`}
              >
                {block.content?.[0]?.text}
              </span>
            </div>
          );

        case "video":
          return (
            <div key={index} className="my-6">
              <video
                controls
                className="w-full rounded"
                src={block.props.url}
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

  const getAllCategories = (post: BlogPost) => {
    return [post.category, post.category2, post.category3].filter(
      Boolean
    ) as string[];
  };

  if (!post) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center py-20">
          Post not found
        </div>
      </section>
    );
  }

  const categories = getAllCategories(post);

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
            <div className="w-full mb-6 px-4 sm:px-8">
              {/* Adds consistent padding */}
              <div className="w-full max-w-[1920px] mx-auto">
                {/* Centered container */}
                <Image
                  src={post.coverImage}
                  alt="Post Cover"
                  width={1920}
                  height={1080}
                  className="w-full h-auto max-h-[70vh] object-cover rounded-lg"
                  priority
                />
              </div>
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
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-black/10 inline-block px-2 py-1 rounded text-md font-thin"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
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
