import { fetchNews } from "./newsApi";
import { fetchGuardianNews } from "./guardianApi"
import { fetchNYTimesNews } from "./nyTimes";
import axios from "axios";

jest.mock("axios");

describe("Service Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchNews fetches data successfully", async () => {
    const mockData = [{ title: "NewsAPI Article" }];
    (axios.get as jest.Mock).mockResolvedValue({ data: { articles: mockData } });

    const result = await fetchNews("technology", 1, "query", { date: "2023-10-01" });

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("https://newsapi.org/v2/top-headlines", {
      params: {
        q: "query",
        category: "technology",
        from: "2023-10-01",
        sources: undefined,
        pageSize: 4,
        page: 1,
        apiKey: process.env.REACT_APP_NEWSAPI_KEY,
      },
    });
  });

  test("fetchGuardianNews fetches data successfully", async () => {
    const mockData = [{ webTitle: "Guardian Article" }];
    (axios.get as jest.Mock).mockResolvedValue({ data: { response: { results: mockData } } });

    const result = await fetchGuardianNews("technology", 1, "query", { date: "2023-10-01" });

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("https://content.guardianapis.com/search", {
      params: {
        q: "query",
        "from-date": "2023-10-01",
        section: "technology",
        pageSize: 4,
        page: 1,
        "api-key": process.env.REACT_APP_GUARDIAN_KEY,
      },
    });
  });

  test("fetchNYTimesNews fetches data successfully", async () => {
    const mockData = [{ headline: { main: "NYTimes Article" } }];
    (axios.get as jest.Mock).mockResolvedValue({ data: { response: { docs: mockData } } });

    const result = await fetchNYTimesNews("technology", 1, "query", { date: "2023-10-01" });

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        q: "query",
        begin_date: "20231001",
        fq: 'section_name:("technology")',
        page: 1,
        "api-key": process.env.REACT_APP_NYTIMES_KEY,
      },
    });
  });
});