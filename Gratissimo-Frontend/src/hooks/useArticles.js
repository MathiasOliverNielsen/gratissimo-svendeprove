import { useFetch } from './useFetch';

export function useArticles() {
  // Fetch all articles from the API, but only once
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: articles, loading, error } = useFetch(`${API_URL}/articles`);

  // fetch single article by article id
  const getArticleById = (id) => {
    return articles?.find((a) => a.id === parseInt(id));
  };

  return { articles, getArticleById, loading, error };
}
