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
  useColorScheme,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { Chip } from "@rneui/base";
import { colorScheme } from "@/constants/colorScheme";

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
    <View style={styles.container} key={index}>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
        }}
        style={styles.imgBackground}
      >
        <Chip
          title={item.vote_average.toFixed(1).toString()}
          icon={{
            name: "star-outline",
            type: "FontAwesome",
            size: 24,
            color: "#FF3D00",
          }}
          titleStyle={{
            fontWeight: "700",
            color: "#FF3D00",
          }}
          size="md"
          containerStyle={{
            marginVertical: 5,
            borderRadius: 10,
            width: 90,
            marginLeft: "auto",
            bottom: 0,
            marginRight: 10,
            paddingRight: 0,
          }}
          color={"	rgba(255, 255, 255, 0.2)"}
          useForeground
        />
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
    justifyContent: "flex-end",
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
