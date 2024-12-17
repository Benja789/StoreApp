import { Platform, StyleSheet } from "react-native";
import Colors from "../Colors";


const SnackStyles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: Platform.OS !== 'ios' ? -40 : 0,
        width: '90%',
        margin: 'auto',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20 ,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 5, 
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2, 
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0
    },
    message: {
        fontSize: 15,
        fontFamily: 'Poppins-ExtraBold',
        color: '#000',
        width: '90%',
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    infoText: {
        color: Colors.info
    }, 
    successText: {
        color: Colors.success
    }, 
    errorText: {
        color: Colors.error
    },
})

export default SnackStyles;
