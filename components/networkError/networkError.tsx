import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors"; // Replace with your colors configuration
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "../ThemedText";
import * as Network from "expo-network";

interface NetworkErrorProps {
  onRetry: () => void; // Callback to retry the failed request
}

const NetworkError: React.FC<NetworkErrorProps> = ({ onRetry }) => {
  const colorScheme = useColorScheme();
  const isConnected = async () => {
    const connected = await Network.getNetworkStateAsync();
    return connected.isConnected;
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "dark"].background },
      ]}
    >
      <MaterialIcons
        name="wifi-off"
        size={50}
        color={Colors[colorScheme ?? "dark"].text}
      />
      <Text
        style={[styles.text, { color: Colors[colorScheme ?? "dark"].text }]}
      >
        Oops! There seems to be a network issue.
      </Text>
      <Text style={[{ color: Colors[colorScheme ?? "dark"].faintText }]}>
        Check your connection and try again.
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          { backgroundColor: Colors[colorScheme ?? "dark"].active },
        ]}
        onPress={async () => {
          if (await isConnected()) {
            onRetry();
          } else {
            return alert("Make sure you are connected to the internet");
          }
        }}
      >
        <ThemedText
          style={{
            textAlign: "center",
          }}
        >
          Retry
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default NetworkError;
