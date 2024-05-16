import React from "react";
//top, general, world, nation, business, technology, entertainment, sports, science and health.
const CategoryTabs = ({ category, handleCategory }) => {
  const categories = [
    "top",
    "world",
    "business",
    "politics",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

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
