import { StyleSheet } from "react-native";

const CartsStyles = StyleSheet.create({
    containerCard: {
        margin: 10, 
        gap: 10,
        // justifyContent: 'space-between', 
        padding: 20,
    },
    details: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20,
    },
    actions: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: '20%', 
        height: 80
    },
    textDescription: {
        width: '75%'
    }
})

export default CartsStyles