import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  homeContainer: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: "70%",
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "left",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  loanCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loanTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  remaining: {
    marginTop: 6,
    fontWeight: "600",
    color: "#d9534f",
  }
});
