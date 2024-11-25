import { useEffect, useState } from "react";

export function useFetchData(urls: string[]) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_ROUTE = process.env.EXPO_PUBLIC_API_ROUTE;
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const fetchData = async () => {
    if (error) {
      setError(false);
    }
    setIsLoading(true);
    try {
      // Fetch all URLs in parallel
      const responses = await Promise.all(
        urls.map((url: string) =>
          fetch(`${API_ROUTE}/${url}`, {
            headers: {
              AUTHORIZATION: "Bearer " + API_KEY,
            },
          })
        )
      );

      // Ensure all responses are okay before proceeding
      const jsonData: any = await Promise.all(
        responses.map((response) => {
          if (!response.ok) {
            setError(true);
          }
          return response.json();
        })
      );

      if (jsonData) {
        setData(jsonData);
        setIsLoading(false);
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
    if (urls.length > 0) {
      fetchData();
    }
  }, [urls]);

  // Return the data, loading, and error states
  return { data, isLoading, error, fetchData };
}
