import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../assets/icons/components/LoadingSpinner";
import { fetchArticles } from "../../services";
import NewsSection from "../../components/NewsSectionComponent/NewsSectionComponent";

const FeedPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", page],
    queryFn: () => fetchArticles(page),
    staleTime: 5000,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-black mb-8">Your News Feed</h1>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="text-red-500">
          Error fetching articles. Please try again later.
        </p>
      )}
      <NewsSection
        title="All News"
        articles={articles || []}
        isLoading={isLoading}
        isError={isError}
      />
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default FeedPage;
