import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchNews } from "../../services/newsApi";
import { fetchGuardianNews } from "../../services/guardianApi";
import { fetchNYTimesNews } from "../../services/nyTimes";
import { normalizeNewsData } from "../../utils/normalizeNewsData";

export const useNews = (
  category: string,
  page: number = 1,
  query: string = "",
  filters?: { date?: string; category?: string; source?: string },
  preferences?: {
    sources?: string[];
    categories?: string[];
    authors?: string[];
  }
) => {
  return useQuery({
    queryKey: ["news", category, page, query, filters, preferences],
    queryFn: async () => {
      const [newsApiData, guardianData, nyTimesData] = await Promise.all([
        fetchNews(category, page, query, {
          ...filters,
          source: preferences?.sources?.join(","),
        }),
        fetchGuardianNews(category, page, query, {
          ...filters,
          category: preferences?.categories?.join(","),
        }),
        fetchNYTimesNews(category, page, query, {
          ...filters,
          category: preferences?.categories
            ? `section_name:("${preferences.categories.join('","')}")`
            : undefined,
        }),
      ]);

      return normalizeNewsData(
        newsApiData,
        guardianData,
        nyTimesData,
        preferences
      );
    },
    retry: 2,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error fetching news:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    },
  } as UseQueryOptions<any[], Error>);
};
