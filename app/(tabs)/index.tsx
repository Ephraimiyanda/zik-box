import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { router } from "expo-router";
import { View, useColorScheme, useWindowDimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import styles from "@/styles/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrendingMovies from "../screenTabs/trendingMovies";
import Category from "../screenTabs/category";
import { ThemedView } from "@/components/ThemedView";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function Index() {
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const layout = useWindowDimensions();
  const colorScheme = useColorScheme();

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const tabTitleStyle = (active: boolean) => {
    return {
      color: active
        ? Colors[colorScheme ?? "dark"].active
        : Colors[colorScheme ?? "dark"].text,
      paddingBottom: 0,
      paddingTop: 0,
      fontSize: 13,
    };
  };

  //tab routes
  const routes = [
    { key: "trending", title: "Trending" },
    { key: "now playing", title: "Now Playing" },
    { key: "popular", title: "Popular" },
    { key: "top rated", title: "Top rated" },
    { key: "tv series", title: "Tv series" },
    { key: "top rated series", title: "Top rated series" },
    { key: "popular series", title: "Popular series" },
  ];

  //conditionally rendering tab views
  const renderScene = ({ route, jumpTo }: { route: any; jumpTo: any }) => {
    switch (route.key) {
      case "trending":
        return <TrendingMovies />;
      case "now playing":
        return <Category category={"Now Playing"} type={"movie"} />;
      case "popular":
        return <Category category={"Popular"} type={"movie"} />;
      case "top rated":
        return <Category category={"Top Rated"} type={"movie"} />;
      case "tv series":
        return <Category category={"Trending"} type={"tv"} />;
      case "top rated series":
        return <Category category={"Top rated"} type={"tv"} />;
      case "popular series":
        return <Category category={"Popular"} type={"tv"} />;
    }
  };

  //render tab bar for tabs view
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: Colors.active,
        height: 3,
        borderRadius: 6,
      }}
      tabStyle={{
        width: "auto",
      }}
      labelStyle={tabTitleStyle}
      scrollEnabled={true}
      style={{
        backgroundColor: "transparent",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 10,
        height: 36,
      }}
      activeColor={Colors[colorScheme ?? "dark"].active}
      inactiveColor={Colors[colorScheme ?? "dark"].text}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.flatContainer}>
        <SearchBar
          onPress={() => {
            router.push("/(tabs)/search");
          }}
          role="link"
          placeholder="Search here..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={{
            backgroundColor: Colors[colorScheme ?? "dark"].fadeColor,
            height: 40,
          }}
          inputStyle={styles.inputStyle}
          round
          searchIcon={
            <Ionicons
              name="search-outline"
              size={24}
              color={Colors[colorScheme ?? "dark"].text}
              style={{ opacity: 0.3 }}
            />
          }
        />
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy={true}
      />
    </ThemedView>
  );
}
