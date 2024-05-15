import React from "react";

const CategoryTabs = ({ category, setCategory }) => {
  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];
  const handleCategory = (cat) => {
    setCategory(cat);
  };
  return (
    <div className="flex gap-2 mt-5 sm:flex-wrap overflow-auto">
      {categories.map((cat) => (
        <div
          onClick={() => handleCategory(cat)}
          key={cat}
          className={`cursor-pointer hover:text-burgundy border px-2 py-1 rounded-full ${
            category === cat ? "text-burgundy font-bold" : ""
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
