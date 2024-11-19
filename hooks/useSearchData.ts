import { useEffect, useState } from "react";
import { useDebounceValue } from "./useDebounceValue";

export function useSearch(query: string, page: number) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchQuery = useDebounceValue(query, 1500);

  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch results
      const response = await fetch(
        `${API_ROUTE}/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`,
        {
          headers: {
            AUTHORIZATION: "Bearer " + API_KEY,
          },
        }
      );
      const resData = await response.json();
      if (response.ok) {
        setData(resData.results);
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
    if (searchQuery.length > 2) {
      fetchData();
    }
  }, [searchQuery, page]);

  // Return the data, loading, and error states
  return { data, isLoading, error };
}
