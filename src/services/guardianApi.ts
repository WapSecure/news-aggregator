import axios from "axios";
import { GUARDIAN_API_KEY, GUARDIAN_BASE_URL } from "../data/constant";

export const fetchGuardianNews = async (
  category: string,
  page: number = 1,
  query: string = "",
  filters?: { date?: string; category?: string }
) => {
  const response = await axios.get(GUARDIAN_BASE_URL, {
    params: {
      q: query || undefined,
      "from-date": filters?.date || undefined,
      section: filters?.category || category.toLowerCase(),
      pageSize: 4,
      page,
      "api-key": GUARDIAN_API_KEY,
    },
  });
  return response.data.response.results;
};