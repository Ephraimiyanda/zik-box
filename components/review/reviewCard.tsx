import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { movieTypes, review } from "@/types/movieTypes";
import { Skeleton } from "@rneui/base";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
export function ReviewCard({
  item,
  cardWidth,
}: {
  item: review;
  cardWidth: number;
}) {
  const previewText = item?.content?.slice(0, 200);
  const [showFullText, setShowFullText] = useState(false);

  //display long text
  const toggleTextDisplay = () => {
    setShowFullText((prev) => !prev);
  };

  const colorScheme = useColorScheme();
  return (
    <View
      key={item.id}
      style={{
        padding: 10,
        borderRadius: 10,

        backgroundColor: Colors[colorScheme ?? "dark"].fadeColor,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={{
            minHeight: 50,
            maxHeight: 50,
            height: "100%",
            flex: 1,
            width: cardWidth,
            borderRadius: 10,
            backgroundColor: Colors.active,
            borderColor: Colors.active,
            maxWidth: 50,
          }}
          contentFit="cover"
          transition={1000}
          source={`https://image.tmdb.org/t/p/original/${item.author_details?.avatar_path}`}
          placeholder={require("../../assets/images/no-avatar.jpg")}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: Colors[colorScheme ?? "dark"].text,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {item.author}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="star"
              size={20}
              color={Colors[colorScheme ?? "dark"].faintText}
            />
            <Text
              style={{
                color: Colors[colorScheme ?? "dark"].faintText,
                fontWeight: "500",
              }}
            >
              {item.author_details.rating ?? "unavailable"}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          paddingVertical: 16,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: Colors[colorScheme ?? "dark"].faintText,
            fontSize: 14,
          }}
        >
          {showFullText ? item.content : previewText}
          {!showFullText &&
            item.content &&
            item.content?.length > 100 &&
            "... "}

          {/* Wrap the "Read More" button inside the Text component */}
          {!showFullText && item.content && item.content?.length > 100 && (
            <Text
              onPress={toggleTextDisplay}
              style={{ color: Colors[colorScheme ?? "dark"].text }}
            >
              Read More
            </Text>
          )}

          {/* Show "Show Less" button if full text is displayed */}
          {showFullText && (
            <Text
              onPress={toggleTextDisplay}
              style={{ color: Colors[colorScheme ?? "dark"].text }}
            >
              Show Less
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
}
