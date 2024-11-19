import { Skeleton } from "@rneui/base";
import { View, StyleSheet, ScrollView } from "react-native";

export function MovieDetailLoader() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Skeleton style={styles.imgBackground}></Skeleton>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 10,
          width: "100%",
          paddingHorizontal: 14,
        }}
      >
        {/* {title} */}
        <Skeleton
          style={{
            width: "50%",
            height: 28,
            marginBottom: 16,
            borderRadius: 15,
          }}
        />
        {/* Header Section */}
        <View style={styles.header}>
          <Skeleton style={{ width: 120, height: 18, borderRadius: 8 }} />
          <Skeleton style={{ width: 120, height: 18, borderRadius: 8 }} />
        </View>
        <Skeleton
          style={{ width: 120, height: 20, marginBottom: 16, borderRadius: 10 }}
        />

        {/* Details Section */}
        <View style={styles.details}>
          <Skeleton
            style={[
              styles.line,
              {
                width: "100%",
                maxWidth: "100%",
              },
            ]}
          ></Skeleton>
          <Skeleton
            style={[
              styles.line,
              {
                width: "90%",
                maxWidth: "90%",
              },
            ]}
          ></Skeleton>
          <Skeleton style={styles.line}></Skeleton>
        </View>

        {/* Genre Section */}
        <View style={styles.genre}>
          <Skeleton style={styles.genreTag} />
          <Skeleton style={styles.genreTag} />
        </View>

        {/* Cast Section */}
        <View style={styles.cast}>
          <View style={styles.profile}>
            <Skeleton style={styles.img} />

            <Skeleton
              style={[
                styles.line,
                {
                  width: "80%",
                  maxWidth: "90%",
                },
              ]}
            />
            <Skeleton
              style={[
                styles.line,
                {
                  width: "100%",
                  maxWidth: "100%",
                },
              ]}
            />
          </View>
          <View style={styles.profile}>
            <Skeleton style={styles.img} />

            <Skeleton
              style={[
                styles.line,
                {
                  width: "80%",
                  maxWidth: "90%",
                },
              ]}
            />
            <Skeleton
              style={[
                styles.line,
                {
                  width: "100%",
                  maxWidth: "100%",
                },
              ]}
            />
          </View>
          <View style={styles.profile}>
            <Skeleton style={styles.img} />

            <Skeleton
              style={[
                styles.line,
                {
                  width: "80%",
                  maxWidth: "90%",
                },
              ]}
            />
            <Skeleton
              style={[
                styles.line,
                {
                  width: "100%",
                  maxWidth: "100%",
                },
              ]}
            />
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendations}>
          <Skeleton style={styles.recommendationCard} />
          <Skeleton style={styles.recommendationCard} />
          <Skeleton style={styles.recommendationCard} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    paddingVertical: 4,
    flexDirection: "column",
    gap: 10,
  },
  imgBackground: {
    width: "100%",
    display: "flex",
    height: 220,
    marginBottom: 16,
  },
  line: {
    bottom: 0,
    height: 14,
    maxWidth: "80%",
    width: "100%",
    borderRadius: 8,
  },

  skeletonBase: {
    opacity: 0.7,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 16,
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
  profile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    gap: 3,
  },
  img: {
    minHeight: 100,
    maxHeight: 100,
    height: "100%",
    flex: 1,
    width: 100,
    borderRadius: 50,
  },
});
