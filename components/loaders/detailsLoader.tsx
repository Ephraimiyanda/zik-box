import { Colors } from "@/constants/Colors";
import { colorScheme } from "@/constants/colorScheme";
import { Skeleton } from "@rneui/base";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

export const SkeletonLoading = () => {
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "dark"].background },
      ]}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Skeleton style={{ width: 200, height: 20, marginBottom: 8 }} />
        <Skeleton style={{ width: 50, height: 20 }} />
      </View>
      <Skeleton style={{ width: 120, height: 20, marginBottom: 16 }} />

      {/* Details Section */}
      <View style={styles.details}>
        <Skeleton style={{ width: "80%", height: 20, marginBottom: 8 }} />
        <Skeleton style={{ width: "60%", height: 20 }} />
      </View>

      {/* Genre Section */}
      <View style={styles.genre}>
        <Skeleton style={styles.genreTag} />
        <Skeleton style={styles.genreTag} />
      </View>

      {/* Cast Section */}
      <View style={styles.cast}>
        <Skeleton style={styles.avatar} />
        <Skeleton style={styles.avatar} />
        <Skeleton style={styles.avatar} />
      </View>

      {/* Recommendations */}
      <View style={styles.recommendations}>
        <Skeleton style={styles.recommendationCard} />
        <Skeleton style={styles.recommendationCard} />
        <Skeleton style={styles.recommendationCard} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  skeletonBase: {
    opacity: 0.7,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  details: {
    marginBottom: 24,
  },
  genre: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  genreTag: {
    width: 80,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  cast: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  recommendations: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendationCard: {
    flex: 1,
    width: "100%",
    height: 150,
    borderRadius: 10,
    maxWidth: 110,
    marginHorizontal: 4,
  },
});
