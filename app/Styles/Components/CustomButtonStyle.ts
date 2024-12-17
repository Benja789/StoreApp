import { StyleSheet } from "react-native";
import Colors from "../Colors";

const CustomButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 18,
    },
    text: {
        color: Colors.buttonText,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        paddingHorizontal: 14
    },
    disabled: {
        backgroundColor: Colors.shadowColor
    }
})

export default CustomButtonStyle