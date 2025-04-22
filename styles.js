import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    surface: {
        alignItems: "center",
        justifyContent: "center",
    },

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
        alignSelf: "center"
    },

    listText: {
        alignSelf: "center"
    },

    image: {
        width: 60,
        height: 60,
        alignSelf: "center"
    },

    button: {
        marginTop: 15,
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
        marginTop:30
    },

    list: {
        height: 490
    }

})
