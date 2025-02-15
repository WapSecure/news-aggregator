import axios, { isAxiosError } from "axios";
import { NEWSAPI_API_KEY, NEWSAPI_BASE_URL } from "../data/constant";

export const fetchNews = async (
  category: string,
  page: number = 1,
  query: string = "",
  filters?: { date?: string; category?: string; source?: string }
) => {
  try {
    const endpoint = category
      ? `${NEWSAPI_BASE_URL}/top-headlines`
      : `${NEWSAPI_BASE_URL}/everything`;

    const response = await axios.get(endpoint, {
      params: {
        q: query || undefined,
        category: category || undefined,
        from: filters?.date || undefined,
        sources: filters?.source || undefined,
        pageSize: 4,
        page,
        apiKey: NEWSAPI_API_KEY,
      },
    });

    return response.data.articles;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.error("Rate limit exceeded for NewsAPI");
        return [];
      }
    }
    throw error;
  }
};
