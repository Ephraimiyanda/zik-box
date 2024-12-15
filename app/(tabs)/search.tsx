import React, { useCallback, useEffect, useRef, useState } from "react";
import { SearchBar, Tab, TabView } from "@rneui/themed";
import { Link, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import styles from "@/styles/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "@/components/ThemedView";
import { SearchCard } from "@/components/search/searchCard";
import { useSearch } from "@/hooks/useSearchData";
import { FlashList } from "@shopify/flash-list";
import { searchCard } from "@/types/movieTypes";
import { SearchLoader } from "@/components/loaders/searchLoader";
import NetworkError from "@/components/networkError/networkError";
import { ThemedText } from "@/components/ThemedText";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const searchBarRef = useRef<TextInput>(null);
  const [page, setPage] = useState(1);
  const [infiniteLoading, setInfiteLoading] = useState(false);

  // Focus on the SearchBar when the page is opened
  useFocusEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  });

  const updateSearch = (search: string) => {
    setSearchQuery(search);
  };

  //render search items
  const renderSearchItem = useCallback(
    ({ item }: { item: searchCard }) => (
      <SearchCard item={item} key={item.id} />
    ),
    []
  );

  // Infinite scrolling function
  const infiniteScrolling = () => {
    if (data && data[0]?.total_pages > page && !infiniteLoading) {
      setInfiteLoading(true);
      setPage(page + 1);
    }
  };

  const { data, isLoading, error, runFetchData } = useSearch(searchQuery, page);

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.flatContainer,
          {
            height: 60,
          },
        ]}
      >
        <SearchBar
          placeholder="Search here..."
          onChangeText={updateSearch}
          value={searchQuery}
          containerStyle={[styles.searchBarContainerStyle]}
          inputContainerStyle={{
            backgroundColor: Colors[colorScheme ?? "dark"].fadeColor,
            height: 40,
          }}
          inputStyle={[
            styles.inputStyle,
            {
              color: Colors[colorScheme ?? "dark"].text,
            },
          ]}
          ref={searchBarRef}
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

        {searchQuery.length > 0 && (
          <Pressable
            style={[
              {
                width: "auto",
                paddingHorizontal: 8,
                height: 40,
              },
              styles.center,
            ]}
            onPress={() => {}}
          >
            <Text
              style={{
                color: Colors[colorScheme ?? "dark"].active,
                marginBottom: "auto",
                marginTop: "auto",
                textAlignVertical: "center",
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              Search
            </Text>
          </Pressable>
        )}
      </View>

      {searchQuery.length >= 1 && !isLoading && !error && (
        <FlashList
          onEndReached={infiniteScrolling}
          keyExtractor={(item, index) => item.id.toString() + index}
          estimatedItemSize={20 * page}
          renderItem={renderSearchItem}
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
          ListEmptyComponent={
            <View
              style={[
                styles.flatContainer,
                {
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={{
                  color: Colors[colorScheme ?? "dark"].active,
                }}
              >
                No results were found for your search
              </Text>
            </View>
          }
          ListFooterComponent={
            <ActivityIndicator
              size="large"
              color={Colors.active}
              animating={infiniteLoading}
              style={{
                marginBottom: 20,
              }}
            />
          }
        ></FlashList>
      )}
      {error && <NetworkError onRetry={runFetchData} />}
      {isLoading && searchQuery.length > 1 ? (
        <SearchLoader />
      ) : (
        <ThemedText style={{ margin: "auto" }}>Enter your search</ThemedText>
      )}
    </ThemedView>
  );
}
