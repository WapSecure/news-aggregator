import { fetchNews } from "./newsApi";
import { fetchGuardianNews } from "./guardianApi";
import { fetchNYTimesNews } from "./nyTimes";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchArticles = async (page: number) => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchWithRetry = async (fetchFunc: () => Promise<any>, retries = 3, delayMs = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchFunc();
      } catch (error: any) {
        if (error.response?.status === 429 && i < retries - 1) {
          console.warn(`Rate limit hit. Retrying in ${delayMs}ms...`);
          await delay(delayMs * (i + 1));
        } else {
          console.error("API request failed:", error);
        }
      }
    }
    return [];
  };

  try {
    const results = await Promise.allSettled([
      fetchWithRetry(() => fetchNews("technology", page)),
      fetchWithRetry(() => fetchGuardianNews("technology", page)),
      fetchWithRetry(() => fetchNYTimesNews("technology", page)),
    ]);

    const newsApiData = results[0].status === "fulfilled" ? results[0].value : [];
    const guardianData = results[1].status === "fulfilled" ? results[1].value : [];
    const nyTimesData = results[2].status === "fulfilled" ? results[2].value : [];

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Error fetching from source ${index + 1}:`, result.reason);
      }
    });

    return normalizeNewsData(newsApiData, guardianData, nyTimesData);
  } catch (error) {
    console.error("Unexpected error fetching articles:", error);
    return [];
  }
};

export { fetchNYTimesNews, fetchGuardianNews, fetchNews };
