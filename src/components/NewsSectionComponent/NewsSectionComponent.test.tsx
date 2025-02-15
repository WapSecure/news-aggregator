import React from "react";
import { render, screen } from "@testing-library/react";
import NewsSection from "./NewsSectionComponent";
import { Article } from "../../types/articles";

const mockArticles: Article[] = [
  {
    title: "Test Article 1",
    description: "This is a test article description.",
    url: "https://example.com",
    urlToImage: "https://example.com/image.jpg",
    source: { name: "Test Source" },
    publishedAt: "2023-10-01T00:00:00Z",
  },
];

test("renders news section with articles", () => {
  render(
    <NewsSection
      title="Test News"
      articles={mockArticles}
      isLoading={false}
      isError={false}
    />
  );

  expect(screen.getByText("Test News")).toBeInTheDocument();

  expect(screen.getByText("Test Article 1")).toBeInTheDocument();
});

test("renders loading spinner when isLoading is true", () => {
  render(
    <NewsSection
      title="Test News"
      articles={[]}
      isLoading={true}
      isError={false}
    />
  );

  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("renders error message when isError is true", () => {
  render(
    <NewsSection
      title="Test News"
      articles={[]}
      isLoading={false}
      isError={true}
    />
  );

  expect(
    screen.getByText("Error fetching test news. Please try again later.")
  ).toBeInTheDocument();
});
