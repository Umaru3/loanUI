import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    item: {
        fontSize: 16,
        marginBottom: 20,
        color: "#444",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
});
