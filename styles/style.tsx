import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  flatContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
    alignItems: "center",
    alignContent: "center",
  },
  searchBarContainerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "transparent",
    transform: "all 0.5s",
    paddingVertical: 4,
    flexDirection: "row",
    flexBasis: 1,
    flex: 1,
  },
  inputStyle: {
    color: "#ffff",
    height: 0,
    borderWidth: 0,
    borderLeftWidth: 0,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  networkError: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#ff4d4d",
    padding: 10,
    zIndex: 1,
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default styles;
