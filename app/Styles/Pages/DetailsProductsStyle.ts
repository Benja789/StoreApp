import { StyleSheet } from "react-native";

const DetailsProductsStyle = StyleSheet.create({
    image: {
        width: "90%",
        maxWidth: 300,
        height: 300,
        marginHorizontal: "auto",
        zIndex: -1,
        marginVertical: 30
    },
    title: {
        textAlign: "center",
        marginVertical: 10
    },
    qualificationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    pointsContainer: {
        borderRadius: 4,
        width: "45%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        alignContent: "center",
    },
    iconStar: {
        width: 30,
        height: 30
    },
    backButton: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1
    },
    containterButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        maxWidth: 700,
        marginHorizontal: "auto",
        alignItems: "center",
    }
});

export default DetailsProductsStyle;