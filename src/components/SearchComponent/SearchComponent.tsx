import React, { useState } from "react";
import Button from "../ButtonComponent/ButtonComponent";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news..."
        className="flex-1 w-full p-2 border border-gray-300 rounded-lg"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
