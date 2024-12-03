import { useEffect, useState, useCallback } from "react";

export function useFetchData(urls: string[], timeoutMs = 7000) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // For pull-to-refresh

  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const fetchDataWithTimeout = async (url: string) => {
    const fetchPromise = fetch(`${API_ROUTE}/${url}`, {
      headers: {
        AUTHORIZATION: "Bearer " + API_KEY,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
  };

  const fetchData = async (isRefreshing = false) => {
    if (!isRefreshing) setIsLoading(true);
    setError(false);

    try {
      const responses = await Promise.all(
        urls.map((url) => fetchDataWithTimeout(url))
      );

      const jsonData = await Promise.all(
        responses.map((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
      );

      setData(jsonData);
    } catch (err) {
      setError(true);
      console.error(err); // Optional: log error for debugging
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData(true);
  }, [urls]);

  useEffect(() => {
    if (urls.length > 0) {
      fetchData();
    }
  }, [urls]);

  return { data, isLoading, error, refresh, isRefreshing };
}
