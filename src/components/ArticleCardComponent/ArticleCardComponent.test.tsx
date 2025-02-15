import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleCard from "./ArticleCardComponent";
import { Article } from "../../types/articles";

const mockArticle: Article = {
  title: "Test Article",
  description: "This is a test article description.",
  url: "https://example.com",
  urlToImage: "https://example.com/image.jpg",
  source: { name: "Test Source" },
  publishedAt: "2023-10-01T00:00:00Z",
};

test("renders article card with correct content", () => {
  render(<ArticleCard article={mockArticle} />);

  expect(screen.getByText("Test Article")).toBeInTheDocument();

  expect(screen.getByText("This is a test article description.")).toBeInTheDocument();

  expect(screen.getByText("Test Source")).toBeInTheDocument();

  expect(screen.getByText("10/1/2023")).toBeInTheDocument();

  expect(screen.getByText("Read more")).toBeInTheDocument();
  expect(screen.getByText("Read more")).toHaveAttribute("href", "https://example.com");
});

test("renders default image if urlToImage is not provided", () => {
  const articleWithoutImage = { ...mockArticle, urlToImage: undefined };
  render(<ArticleCard article={articleWithoutImage} />);

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "/public/imageholder.webp");
});