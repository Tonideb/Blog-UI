type FiltersProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="mb-10">
      {/* Category Filter Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-gray-700">
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-sm ${
                selectedCategory === category
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-50"
              }`}
              aria-label={`Filter by ${category}`}
            >
              {category}
              {category === "All" && (
                <span className="ml-1 text-xs opacity-80">
                  ({categories.length - 1})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
