import axios, { isAxiosError } from "axios";
import { NYTIMES_API_KEY, NYTIMES_BASE_URL } from "../data/constant";

export const fetchNYTimesNews = async (
  category: string,
  page: number = 1,
  query: string = "",
  filters?: { date?: string; category?: string }
) => {
  try {
    const response = await axios.get(NYTIMES_BASE_URL, {
      params: {
        q: query || undefined,
        begin_date: filters?.date?.replace(/-/g, "") || undefined,
        fq: filters?.category
          ? `section_name:("${filters.category}")`
          : `section_name:("${category}")`,
        page,
        "api-key": NYTIMES_API_KEY,
      },
    });
    return response.data.response.docs;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.error("Rate limit exceeded for NYTimes API");
        return [];
      }
    }
    throw error;
  }
};
