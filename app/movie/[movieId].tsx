import styles from "@/styles/style";
import { ScrollView, View } from "react-native";

export default function MovieDetails() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          paddingHorizontal: 4,
          paddingVertical: 4,
          display: "flex",
        }}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 4,
        }}
      ></ScrollView>
    </View>
  );
}
