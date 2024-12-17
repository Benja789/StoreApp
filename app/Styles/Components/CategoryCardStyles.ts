import { StyleSheet } from "react-native"
import Colors from "../Colors"

const CategoryCardStyle = StyleSheet.create({
    card: {
        height: 80,
        width: 200,
    },
    contentCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderRadius: 20,
    },
    selected: {
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 20,
    },
    textBase: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    selectedText: {
        color: Colors.primary,
        fontFamily: 'Poppins-Bold',
    },
    text: {
        fontFamily: 'Poppins-Regular',
    }
})

export default CategoryCardStyle