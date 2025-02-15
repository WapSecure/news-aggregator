import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { useNews } from "../../hooks/UseNews/useNews";


jest.mock("../hooks/useNews", () => ({
  useNews: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders news sections", () => {
    const mockNews = [{ title: "Latest News Article" }];
    (useNews as jest.Mock).mockReturnValue({
      data: mockNews,
      isLoading: false,
      isError: false,
    });

    render(<HomePage />);

    expect(screen.getByText("Latest News")).toBeInTheDocument();
    expect(screen.getByText("World News")).toBeInTheDocument();
    expect(screen.getByText("Technology News")).toBeInTheDocument();

    expect(screen.getByText("Latest News Article")).toBeInTheDocument();
  });

  test("renders loading spinner while fetching data", () => {
    (useNews as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<HomePage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error message if fetching fails", () => {
    (useNews as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<HomePage />);

    expect(screen.getByText("Error fetching latest news. Please try again later.")).toBeInTheDocument();
  });
});