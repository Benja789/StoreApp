import { StyleSheet } from "react-native";
import Colors from "./Colors";

const Base = StyleSheet.create({
    // Backgrounds
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centredItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Textos de la APP
    textTitleH1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 26,
        color: Colors.textPrimary
    },
    textTitleH2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
    },

    textTitleH3: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    textP:{
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },

    // Tarjeta
    card: {
        borderRadius: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 5, 
        },
        borderColor: Colors.border,
        borderWidth: 1,
    },
    titleCard: {
        paddingVertical: 20,
    },
    contentCard: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 'auto',
    },
    actionCard:{
        paddingVertical: 20,
    },

    // Contenedore de la pagina
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.background,

    },

    // InpuText
    inputText: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderInputText,
        paddingHorizontal: 20,
    },

    // Text de error 
    errorText: {
        color: Colors.error,
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        textAlign: 'left',
    },

    // Sombras
    shadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: {
            width: 2, 
            height: 2, 
        },
        borderWidth: 1,
        borderColor: Colors.border,
        shadowRadius: 3.84, 
        shadowOpacity: 0.01, 
    },


    // Separador
    separator: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
})

export default Base;