import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedPage from "./FeedPage";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("FeedPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner while fetching data", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<FeedPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error message if fetching fails", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<FeedPage />);

    expect(screen.getByText("Error fetching articles. Please try again later.")).toBeInTheDocument();
  });

  test("renders articles and handles load more", async () => {
    const mockArticles = [{ title: "Test Article" }];
    (useQuery as jest.Mock).mockReturnValue({
      data: mockArticles,
      isLoading: false,
      isError: false,
    });

    render(<FeedPage />);

    expect(screen.getByText("Test Article")).toBeInTheDocument();

    const loadMoreButton = screen.getByText("Load More");
    fireEvent.click(loadMoreButton);

  });
});