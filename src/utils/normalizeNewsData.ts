import { nytimesURL } from "../data/constant";

export const normalizeNewsData = (
  newsApiData: any[],
  guardianData: any[],
  nyTimesData: any[],
  preferences?: { authors?: string[] }
) => {
  const normalizedData = [
    ...(newsApiData || []),
    ...(guardianData || []).map((article: any) => ({
      title: article.webTitle,
      description: article.fields?.trailText,
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail,
      source: { name: "The Guardian" },
      publishedAt: article.webPublicationDate,
    })),
    ...(nyTimesData || []).map((article: any) => ({
      title: article.headline.main,
      description: article.abstract,
      url: article.web_url,
      urlToImage: article.multimedia[0]?.url
        ? `${nytimesURL}${article.multimedia[0].url}`
        : undefined,
      source: { name: "New York Times" },
      publishedAt: article.pub_date,
    })),
  ];

  if (preferences?.authors?.length) {
    return normalizedData.filter((article) =>
      preferences.authors?.some((author) =>
        article.title.toLowerCase().includes(author.toLowerCase())
      )
    );
  }

  return normalizedData;
};
