import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as Network from "expo-network";
import { useFetchData } from "@/hooks/useFetchData";
import { MovieCardLoader } from "@/components/loaders/movieCardLoader";
import { MovieCard } from "@/components/movie/movieCard";
import { movieTypes } from "@/types/movieTypes";
import ButtonFlatList from "@/components/butons/buttonList";
import { CountryCodes } from "@/constants/lists";
import { useIsFocused } from "@react-navigation/native";

interface ApiResponse {
  results: movieTypes[];
}

export default function Category({
  category,
  type,
}: {
  category: string;
  type: string;
}) {
  const [trendingWeekMovieData, setTrendingWeekMovieData] =
    useState<ApiResponse>();
  const [selectedCountryCode, setSelectedCountryCode] = useState("All");
  const [page, setPage] = useState(1);
  const formatCategory = category.split(" ").join("_").toLocaleLowerCase();
  const [urls, setUrls] = useState<string[]>([]);
  const isFocused = useIsFocused();

  // Fetch data when the screen is focused
  useEffect(() => {
    if (isFocused) {
      setUrls([
        formatCategory === "trending"
          ? `trending/tv/week?language=en-US&region=${
              selectedCountryCode === "All" ? "" : selectedCountryCode
            }&page=${page}`
          : `${type}/${formatCategory}?language=en-US&region=${
              selectedCountryCode === "All" ? "" : selectedCountryCode
            }&page=${page}`,
      ]);
    }
  }, [isFocused, selectedCountryCode, page]);

  //get parameters from hook
  const { data, isLoading, error } = useFetchData(urls);

  //get past 10 years
  function getLastTenYears() {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 0; i <= 10; i++) {
      years.push(currentYear - i);
    }

    return years;
  }
  useEffect(() => {
    if (data) {
      setTrendingWeekMovieData(data[0] || []);
    }
  }, [data]);
  const isConnected = async () => {
    const connected = await Network.getNetworkStateAsync();
    return connected.isConnected;
  };
  return (
    <ScrollView
      style={{
        paddingHorizontal: 4,
        paddingVertical: 4,
        display: "flex",
      }}
      contentContainerStyle={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 4,
        paddingBottom: 20,
      }}
    >
      {!isLoading && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <ButtonFlatList
            buttons={CountryCodes}
            selectedButton={selectedCountryCode}
            setSelectedButton={setSelectedCountryCode}
          ></ButtonFlatList>
        </View>
      )}
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          gap: 3,
        }}
      >
        {!isLoading &&
        trendingWeekMovieData &&
        trendingWeekMovieData?.results?.length > 0 ? (
          trendingWeekMovieData?.results.map((movie: movieTypes) => (
            <MovieCard key={movie.id} item={movie}></MovieCard>
          ))
        ) : (
          <MovieCardLoader></MovieCardLoader>
        )}
      </View>
    </ScrollView>
  );
}
