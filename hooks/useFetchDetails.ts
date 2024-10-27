import { useEffect, useState } from "react";
interface tmdbData {
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  tagline: string;
  status: string;
  vote_average: number;
}
export function useFetchDetails(url: string) {
  const [tmdbData, setTmdbData] = useState<tmdbData>();
  const [ytsData, setYtsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const fetchYtsData = async (id: number) => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?imdb_id=${id}`
      );
      const resData = await response.json();
      if (resData) {
        setYtsData(resData.data.movie);
      }
    } catch (err) {
      setYtsData(null);
    }
  };
  const fetchTmdbData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/${url}`, {
        headers: {
          AUTHORIZATION: "Bearer " + API_KEY,
        },
      });
      const resData = await response.json();

      if (resData) {
        setTmdbData(resData);
        fetchYtsData(resData.imdb_id);
      }
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.error(err); // Optional: log the error for debugging
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTmdbData();
  }, []);

  // Return the data, loading, and error states
  return { tmdbData, ytsData, isLoading, error };
}
