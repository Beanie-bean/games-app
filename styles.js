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
        fontSize: 18,
        alignSelf: "center",
        paddingBottom: 20
    },

    image: {
        width: 70,
        height: 70,
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
