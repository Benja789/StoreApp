import { StyleSheet } from "react-native";

const ProfileStyle = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        bottom: 110,
        position: "absolute",
        marginHorizontal: "auto",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    infoContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
})

export default ProfileStyle;