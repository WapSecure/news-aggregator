import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchComponent";

test("renders search bar and handles input", () => {
  const handleSearch = jest.fn();
  render(<SearchBar onSearch={handleSearch} />);

  // Type into the search input
  const searchInput = screen.getByPlaceholderText("Search for news...");
  fireEvent.change(searchInput, { target: { value: "test query" } });

  // Submit the form
  const searchButton = screen.getByText("Search");
  fireEvent.click(searchButton);

  // Check if the search function was called with the correct query
  expect(handleSearch).toHaveBeenCalledWith("test query");
});