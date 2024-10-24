import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 25,
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
    borderColor: "transparent",
    transform: "all 0.5s",
    paddingVertical: 4,
  },
  inputStyle: {
    borderRadius: 30,
    color: "#ffff",
    height: 0,
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
