import { StyleSheet } from "react-native";
import Colors from "../Colors";

const HomeStyles = StyleSheet.create({
    titleContainer: {
        width:"90%",
        marginHorizontal: "auto",
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    },
    searchInput: {
        width: "100%",
        paddingLeft: 20,
        maxWidth: 700,
        marginHorizontal: "auto",
        marginVertical: 20,
        borderRadius: 20,
        borderColor: Colors.border,
        height: 50,
        borderWidth: 1,
    }
})

export default HomeStyles