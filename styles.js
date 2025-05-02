import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10
    },

    heading1: {
        fontSize: 28,
    },

    heading2: {
        fontSize: 22,
        alignSelf: "center"
    },

    text: {
        fontSize: 18,
        alignSelf: "center",
        paddingBottom: 20
    },

    image: {
        width: 150,
        height: 100,
        alignSelf: "center",
    },

    button: {
        marginTop: 10,
    },

    buttons: {
        justifyContent: 'center',
        flexDirection: "row",
        gap: 30
    },

    separator: {
        marginVertical: 15,
        borderColor: "gray",
        borderBottomWidth: 1
    },

    appBar: {
        marginTop: 30
    },

    list: {
        height: 490,
    },

    listItem: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
})
