import { Skeleton } from "@rneui/base";
import { View } from "react-native";

export function MovieCardLoader() {
  function repeatLoader() {
    const loaders = [];
    for (var i = 0; i < 12; i++) {
      loaders.push(
        <View
          key={i}
          style={{
            position: "relative",
            flexDirection: "column",
            display: "flex",
            gap: 3,
            paddingVertical: 3,
          }}
        >
          <Skeleton
            style={{
              flex: 1,
              width: "100%",
              height: 150,
              borderRadius: 10,
              maxWidth: 110,
            }}
          />
          <Skeleton
            width={110}
            height={14}
            style={{
              borderRadius: 5,
            }}
          />
        </View>
      );
    }
    return loaders;
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "auto",
        width: "100%",
        gap: 5,
      }}
    >
      {repeatLoader()}
    </View>
  );
}
