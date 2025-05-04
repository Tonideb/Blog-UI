"use client";

import { useState, useEffect } from "react";
import HeroBlogCard from "./HeroBlogCard";
import Filters from "./Filters";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  cardColor: string;
  coverImage: string | null;
  category: string;
  content: any[];
  createdAt: string;
  updatedAt: string;
}

export default function HeroBlogPreview() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://expressjs-prisma-production-c3ba.up.railway.app/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                y: -10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
            >
              <HeroBlogCard 
                title={post.title}
                author={post.author}
                category={post.category}
                date={new Date(post.createdAt).toLocaleDateString()}
                cardColor={post.cardColor}
              
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}