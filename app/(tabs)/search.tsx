import React, { useEffect, useRef, useState } from "react";
import { SearchBar, Tab, TabView } from "@rneui/themed";
import { Link, useFocusEffect } from "expo-router";
import { Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import styles from "@/styles/style";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Search() {
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const searchBarRef = useRef<TextInput>(null);

  // Focus on the SearchBar when the page is opened
  useFocusEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  });

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.flatContainer,
          {
            height: 60,
            paddingLeft: 3,
            paddingRight: 4,
          },
        ]}
      >
        <SearchBar
          placeholder="Search here..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={[
            styles.searchBarContainerStyle,
            {
              width: search.length > 0 ? "80%" : "100%",
            },
          ]}
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

        <Pressable
          style={[
            {
              width: search.length > 0 ? "30%" : 0,
              height: 40,
            },
            styles.center,
          ]}
          onPress={() => {
            setSearch("");
          }}
        >
          <Text
            style={{
              color: Colors[colorScheme ?? "dark"].active,
              marginBottom: "auto",
              marginTop: "auto",
              textAlignVertical: "center",
            }}
          >
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
