import React, { useState } from "react";
import { SearchBar, Tab, TabView } from "@rneui/themed";
import { router } from "expo-router";
import { View, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import styles from "@/styles/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrendingMovies from "../screenTabs/trendingMovies";
import Category from "../screenTabs/category";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = useState("");
  const [loadedTabs, setLoadedTabs] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Function to mark a tab as loaded the first time it's viewed
  const markTabAsLoaded = (tabIndex: number) => {
    setLoadedTabs((prev) => {
      const updatedTabs = [...prev];
      updatedTabs[tabIndex] = true;
      return updatedTabs;
    });
  };

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

      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: Colors.active,
          height: 3,
          borderRadius: 6,
        }}
        variant="default"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 5,
          paddingRight: 10,
          height: 36,
        }}
        scrollable
      >
        <Tab.Item title="Trending" titleStyle={tabTitleStyle} />
        <Tab.Item title="Now Playing" titleStyle={tabTitleStyle} />
        <Tab.Item title="Popular" titleStyle={tabTitleStyle} />
        <Tab.Item title="Top Rated" titleStyle={tabTitleStyle} />
        <Tab.Item title="Tv series" titleStyle={tabTitleStyle} />
        <Tab.Item title="Top Rated series" titleStyle={tabTitleStyle} />
        <Tab.Item title="Popular series" titleStyle={tabTitleStyle} />
      </Tab>

      <TabView
        value={index}
        onChange={(newIndex) => {
          setIndex(newIndex);
          markTabAsLoaded(newIndex); // Mark the tab as loaded when you switch to it
        }}
        animationType="spring"
      >
        {/* Trending Movies Tab */}
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          {loadedTabs[0] && <TrendingMovies />}
          {/* Already loaded */}
        </TabView.Item>

        {/* Now Playing Movies Tab */}
        <TabView.Item>
          {loadedTabs[1] ? (
            <Category category={"Now Playing"} type={"movie"} />
          ) : null}
        </TabView.Item>

        {/* Popular Movies Tab */}
        <TabView.Item>
          {loadedTabs[2] ? (
            <Category category={"Popular"} type={"movie"} />
          ) : null}
        </TabView.Item>

        {/* Top Rated Movies Tab */}
        <TabView.Item>
          {loadedTabs[3] ? (
            <Category category={"Top Rated"} type={"movie"} />
          ) : null}
        </TabView.Item>

        {/* Trending TV Tab */}
        <TabView.Item>
          {loadedTabs[4] ? (
            <Category category={"Trending"} type={"tv"} />
          ) : null}
        </TabView.Item>

        {/* Top Rated TV Tab */}
        <TabView.Item>
          {loadedTabs[5] ? (
            <Category category={"Top Rated"} type={"tv"} />
          ) : null}
        </TabView.Item>

        {/* Popular TV Tab */}
        <TabView.Item>
          {loadedTabs[6] ? <Category category={"Popular"} type={"tv"} /> : null}
        </TabView.Item>
      </TabView>
    </ThemedView>
  );
}
