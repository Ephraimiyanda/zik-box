import { Skeleton } from "@rneui/base";
import { View, StyleSheet } from "react-native";

export function MovieDetailLoader() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.imgBackground}></Skeleton>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 10,
          width: "100%",
          paddingLeft: 20,
        }}
      >
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
    </View>
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
  },
  line: {
    bottom: 0,
    height: 14,
    maxWidth: "80%",
    width: "100%",
    borderRadius: 8,
  },
});
