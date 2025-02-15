import React from "react";
import ArticleCard from "../ArticleCardComponent/ArticleCardComponent";
import LoadingSpinner from "../../assets/icons/components/LoadingSpinner";
import { NewsSectionProps } from "../../types/newSection";

const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  articles,
  isLoading,
  isError,
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="text-red-500">
          Error fetching {title.toLowerCase()} news. Please try again later.
        </p>
      )}
      {articles?.length === 0 && !isLoading && (
        <p className="text-gray-500">No articles found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
