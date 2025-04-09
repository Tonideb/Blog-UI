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
      <div className="flex gap-3 mb-10 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  