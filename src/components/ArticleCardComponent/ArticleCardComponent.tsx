import React from "react";
import { ReadMore } from "../../data/constant";
import { Article } from "../../types/articles";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={article.urlToImage || "/public/imageholder.webp"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-black">{article.title}</h2>
        <p className="text-gray-700 mt-2">{article.description}</p>
        {article.source && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600">{article.source.name}</span>
            {article.publishedAt && (
              <span className="text-sm text-gray-600">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          {ReadMore}
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
