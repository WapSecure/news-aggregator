import { fetchNews } from "./newsApi";
import { fetchGuardianNews } from "./guardianApi";
import { fetchNYTimesNews } from "./nyTimes";
import { Article } from "../types/articles";

export const fetchArticles = async (page: number): Promise<Article[]> => {
  try {
    const [newsApiData, guardianData, nyTimesData] = await Promise.all([
      fetchNews("technology", page), 
      fetchGuardianNews("technology", page),
      fetchNYTimesNews("technology", page),
    ]);

    return [...newsApiData, ...guardianData, ...nyTimesData];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};