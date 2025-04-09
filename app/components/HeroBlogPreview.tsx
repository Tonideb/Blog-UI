"use client";

import { useState } from "react";
import HeroBlogCard from "./HeroBlogCard";
import Filters from "./Filters";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroBlogPreview() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cards = [
    { id: 1, category: "Category 1" },
    { id: 2, category: "Category 2" },
    { id: 3, category: "Category 3" },
    { id: 4, category: "Category 4" },
  ];

  const filteredCards =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  const categories = [
    "All",
    ...Array.from(new Set(cards.map((card) => card.category))),
  ];

  return (
    <div>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {filteredCards.map((card) => (
            <motion.div
              key={card.id}
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
              <HeroBlogCard category={card.category} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
