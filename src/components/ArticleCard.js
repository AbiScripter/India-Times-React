import React from "react";

// const ArticleCard = ({ article }) => {
//   const formatDate = (date) => {
//     const newDate = new Date(date);
//     return String(newDate).slice(4, 15);
//   };

//   return (
//     <>
//       <div className={"shadow-xl h-[25rem]"}>
//         <img
//           className={"h-[15rem] w-full object-cover"}
//           src={article.image_url}
//           alt="article"
//         />
//         <a
//           className="font-bold underline"
//           href={article.link}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {article.title}
//         </a>
//         <p className="mt-1">{article.source?.name}</p>
//         <p className="flex justify-between text-sm px-1">
//           <span>{formatDate(article?.pubDate)}</span>
//         </p>
//       </div>
//     </>
//   );
// };

const ArticleCard = ({ article }) => {
  //if the article doesn't have image, don't render
  if (!article.image_url || !article.description) return null;

  return (
    <div
      className="relative p-5 rounded-lg text-beige shadow-lg"
      style={{
        backgroundImage: `url(${article.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50 p-5 rounded-lg">
        <div className="article-header">
          <h3 className="m-0 ">{article.title}</h3>
        </div>
        <div className="mt-2 article-content">
          <p>
            <span className="">{article.description?.slice(0, 200)}</span>
            <span className="block mt-2 text-beige">
              <a
                className="underline text-blue hover:text-burgundy"
                target="_blank"
                rel="noopener noreferrer"
                href={article.link}
              >
                Read More
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
