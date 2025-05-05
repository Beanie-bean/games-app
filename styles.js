import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    },

    indexCard: {
        margin: 20,
        padding: 10,
        backgroundColor: "#afd7cb"
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
        borderBottomWidth: 1,
        borderColor: '#88c1b1'
    },

    appBar: {
        marginTop: 30
    },

    list: {
        height: 410,
    },

    listItem: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    topButtons: {
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    modalButton: {
        marginTop: 10,
        marginBottom: 10
    },

    indexListItem: {
        flex: 1,
        flexDirection: "row",
        width: 80,
        height: 80,
    },

    selectedStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        margin: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    textSelectedStyle: {
        marginRight: 5,
        fontSize: 15,
    },

    section_style: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },

    item_style: {
        padding: 10,
        backgroundColor: '#e1e1e1',
        borderRadius: 14,
        width: 240,
        marginVertical: 4,
        marginHorizontal: 18,
    },

    clearButton: {
        fontSize: 14
    }
})
