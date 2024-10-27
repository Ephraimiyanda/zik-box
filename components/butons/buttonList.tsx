import React, {
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
// Replace with your actual Colors import
interface buttonList {
  buttons: string[];
  selectedButton: string;
  setSelectedButton: SetStateAction<string | any>;
}
const ButtonFlatList = ({
  buttons,
  selectedButton,
  setSelectedButton,
}: buttonList) => {
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: any) => {
    const isSelected = selectedButton === item;

    return (
      <TouchableOpacity
        onPress={() => setSelectedButton(item)}
        style={{
          minWidth: 40,
          paddingHorizontal: 4,
          borderRadius: 5,
          backgroundColor: isSelected
            ? Colors[colorScheme ?? "dark"].tabColor
            : "transparent",
          marginRight: 0,
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: Colors[colorScheme ?? "dark"].text,
            textAlign: "center",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 10,
        paddingLeft: 5,
        paddingVertical: 3,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    />
  );
};

export default ButtonFlatList;
