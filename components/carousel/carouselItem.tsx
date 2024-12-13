import { Colors } from "@/constants/Colors";
import { movieTypes } from "@/types/movieTypes";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { CustomChip } from "../chip/chip";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const CarouselCardItem = ({
  item,
  index,
}: {
  item: movieTypes;
  index: number;
}) => {
  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        router.push(`/movie/${item.id}`);
      }}
      key={index}
    >
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
        }}
        style={styles.imgBackground}
      >
        <CustomChip
          title={item.vote_average.toFixed(1).toString()}
          marginLeft={"auto"}
          marginRight={10}
        ></CustomChip>
      </ImageBackground>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          width: "100%",
          paddingLeft: 20,
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ThemedText
            style={{
              bottom: 0,
              textAlign: "left",
              fontWeight: "700",
              maxWidth: "80%",
            }}
            numberOfLines={1}
          >
            {item.title}
          </ThemedText>
          <ThemedText
            style={{
              bottom: 0,
              textAlign: "left",
              fontWeight: "400",
              fontSize: 14,
              lineHeight: 16,
              maxWidth: "81%",
            }}
            numberOfLines={2}
          >
            {item.overview}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 4,
    flexDirection: "column",
    gap: 4,
  },
  imgBackground: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    height: 160,
  },

  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginVertical: "auto",
    position: "relative",
    zIndex: 20,
    opacity: 1,
    marginTop: -60,
  },
});
