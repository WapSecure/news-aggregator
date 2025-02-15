import { getEnvVariable } from "../utils/env";

export const PageTitle = "News Aggregator";
export const Preference = "News Preference";
export const ReadMore = "Read More";

export const nytimesURL = "https://www.nytimes.com/"

export const NYTIMES_API_KEY = getEnvVariable("REACT_APP_NYTIMES_KEY");
export const NEWSAPI_API_KEY = getEnvVariable("REACT_APP_NEWSAPI_KEY");
export const GUARDIAN_API_KEY = getEnvVariable("REACT_APP_GUARDIAN_KEY");

export const NYTIMES_BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
export const NEWSAPI_BASE_URL = "https://newsapi.org/v2";
export const GUARDIAN_BASE_URL = "https://content.guardianapis.com/search";