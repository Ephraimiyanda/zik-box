import { Skeleton } from "@rneui/base";
import { View, StyleSheet } from "react-native";

export function CarouselLoader() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.imgBackground}></Skeleton>
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
        <Skeleton style={styles.image} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton
            style={{
              bottom: 0,
              height: 10,
              maxWidth: "80%",
            }}
          ></Skeleton>
          <Skeleton
            style={{
              bottom: 0,
              height: 10,
              maxWidth: "81%",
            }}
          ></Skeleton>
        </View>
      </View>
    </View>
  );
}
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
    borderWidth: 1,
  },
});
