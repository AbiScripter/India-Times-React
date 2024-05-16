import React from "react";

const ArticleCard = ({ index, article, isLoading }) => {
  const isSecondDiv = index % 3 === 0;
  const spanClass = isSecondDiv ? "lg:col-span-6" : "lg:col-span-3";
  const heightClass = isSecondDiv ? "lg:row-span-2" : "lg:row-span-1";

  return (
    <div
      className={`${spanClass} ${heightClass} odd:bg-pink-400 even:bg-blue-300 rounded-e p-2`}
    >
      <img
        className={`${
          isSecondDiv
            ? "lg:min-w-full lg:min-h-[70%] object-cover"
            : "h-[15rem] w-full object-cover"
        }`}
        src={article.image_url}
        alt="article"
      />
      <p className="font-bold underline">{article.title}</p>
      <p className="mt-1">{article.source?.name}</p>
    </div>
  );
};

export default ArticleCard;
