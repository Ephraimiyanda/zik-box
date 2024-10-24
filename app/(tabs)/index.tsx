import React, { useState } from "react";
import { ButtonGroup, SearchBar, Tab, TabView } from "@rneui/themed";
import { Link, router } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import styles from "@/styles/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MovieCard } from "@/components/movie/movieCard";
import { MovieCardLoader } from "@/components/loaders/movieCardLoader";
import { SearchCard } from "@/components/search/searchCard";
import ButtonFlatList from "@/components/butons/buttonList";
import TrendingMovies from "../screenTabs/trendingMovies";
import { ThemedText } from "@/components/ThemedText";
import Category from "../screenTabs/category";

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = useState("");

  const colorScheme = useColorScheme();

  const updateSearch = (search: string) => {
    setSearch(search);
  };
  const tabTitleStyle = (active: boolean) => {
    return {
      color: active
        ? colorScheme === "dark"
          ? Colors.dark.active
          : Colors.light.active
        : colorScheme === "dark"
        ? Colors.dark.text
        : Colors.light.text,
      paddingBottom: 0,
      paddingTop: 0,
    };
  };
  return (
    <View style={styles.container}>
      <SearchBar
        onPress={() => {
          router.push("/(tabs)/search");
        }}
        role="link"
        placeholder="Search here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={[
          styles.searchBarContainerStyle,
          {
            paddingBottom: 0,
            borderWidth: 0,
          },
        ]}
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
          height: 38,
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
        <Tab.Item title="Latest" titleStyle={tabTitleStyle} />
        <Tab.Item title="Airing Today" titleStyle={tabTitleStyle} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <TrendingMovies />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Now Playing"} type={"movie"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Popular"} type={"movie"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Top Rated"} type={"movie"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Trending"} type={"tv"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Top Rated"} type={"tv"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Popular"} type={"tv"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Latest"} type={"tv"} />
        </TabView.Item>
        <TabView.Item>
          <Category category={"Airing Today"} type={"tv"} />
        </TabView.Item>
      </TabView>
    </View>
  );
}
