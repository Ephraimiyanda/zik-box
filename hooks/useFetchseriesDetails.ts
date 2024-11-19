import { tmdbData, tmdbTvData } from "@/types/movieTypes";
import { useEffect, useState } from "react";

export function useFetchSeriesDetails(seriesId: string | string[]) {
  const [tmdbData, setTmdbData] = useState<tmdbTvData>();
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
    const urls = [
      `tv/${seriesId}?language=en-US`,
      `tv/${seriesId}/recommendations?language=en-US&page=1`,
      `tv/${seriesId}/videos`,
      `tv/${seriesId}/credits?language=en-US`,
      `tv/${seriesId}/reviews?language=en-US&page=1`,
    ];
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
      const crewData = [...jsonData[3].cast, ...jsonData[3].crew];
      const uniqueCrewData = [
        ...new Map(crewData.map((item) => [item.id, item])).values(),
      ];
      setTmdbData({
        ...tmdbData,
        ...jsonData[0],
        recommendations: jsonData[1].results || [],
        videos: jsonData[2].results || [],
        cast: uniqueCrewData || [],
        reviews: jsonData[4].results || [],
      });
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
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
