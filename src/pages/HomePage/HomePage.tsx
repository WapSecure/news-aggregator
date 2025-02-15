// pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchComponent/SearchComponent";
import Filters from "../../components/FilterComponent/FilterComponent";
import { useNews } from "../../hooks/UseNews/useNews";
import NewsSection from "../../components/NewsSectionComponent/NewsSectionComponent";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    source: "",
  });
  const [preferences, setPreferences] = useState<{
    sources: string[];
    categories: string[];
    authors: string[];
  }>({ sources: [], categories: [], authors: [] });

  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const {
    data: latestNews,
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
  } = useNews("latest", 1, query, filters, preferences);

  const {
    data: worldNews,
    isLoading: isLoadingWorld,
    isError: isErrorWorld,
  } = useNews("world", 1, query, filters, preferences);

  const {
    data: techNews,
    isLoading: isLoadingTech,
    isError: isErrorTech,
  } = useNews("technology", 1, query, filters, preferences);

  return (
    <div className="pt-20 w-full max-w-screen-xl mx-auto">
      <div className="flex gap-2 mb-4 w-full">
        <div className="flex-[0.90]">
          <SearchBar onSearch={setQuery} />
        </div>
        <div className="flex-[0.10]">
          <Filters onFilter={setFilters} />
        </div>
      </div>

      <NewsSection
        title="Latest News"
        articles={latestNews || []}
        isLoading={isLoadingLatest}
        isError={isErrorLatest}
      />
      <NewsSection
        title="World News"
        articles={worldNews || []}
        isLoading={isLoadingWorld}
        isError={isErrorWorld}
      />
      <NewsSection
        title="Technology News"
        articles={techNews || []}
        isLoading={isLoadingTech}
        isError={isErrorTech}
      />
    </div>
  );
};

export default Home;
