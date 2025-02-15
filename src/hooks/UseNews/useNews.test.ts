import { renderHook, waitFor } from "@testing-library/react";
import { useNews } from "./useNews";
import { fetchNews, fetchGuardianNews, fetchNYTimesNews } from "../../services";
import { normalizeNewsData } from "../../utils/normalizeNewsData";

// Mock the services
jest.mock("../services", () => ({
  fetchNews: jest.fn(),
  fetchGuardianNews: jest.fn(),
  fetchNYTimesNews: jest.fn(),
}));

jest.mock("../utils/normalizeNewsData", () => ({
  normalizeNewsData: jest.fn(),
}));

describe("useNews Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and normalizes news data", async () => {
    const mockNewsApiData = [{ title: "NewsAPI Article" }];
    const mockGuardianData = [{ webTitle: "Guardian Article" }];
    const mockNYTimesData = [{ headline: { main: "NYTimes Article" } }];
    const mockNormalizedData = [{ title: "Normalized Article" }];

    (fetchNews as jest.Mock).mockResolvedValue(mockNewsApiData);
    (fetchGuardianNews as jest.Mock).mockResolvedValue(mockGuardianData);
    (fetchNYTimesNews as jest.Mock).mockResolvedValue(mockNYTimesData);
    (normalizeNewsData as jest.Mock).mockReturnValue(mockNormalizedData);

    const { result } = renderHook(() =>
      useNews("technology", 1, "query", { date: "2023-10-01" }, { sources: ["NewsAPI"] })
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockNormalizedData);

    expect(fetchNews).toHaveBeenCalledWith("technology", 1, "query", {
      date: "2023-10-01",
      source: "NewsAPI",
    });
    expect(fetchGuardianNews).toHaveBeenCalledWith("technology", 1, "query", {
      date: "2023-10-01",
      category: undefined,
    });
    expect(fetchNYTimesNews).toHaveBeenCalledWith("technology", 1, "query", {
      date: "2023-10-01",
      category: undefined,
    });
  });

  test("handles errors gracefully", async () => {
    (fetchNews as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() =>
      useNews("technology", 1, "query", { date: "2023-10-01" })
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});