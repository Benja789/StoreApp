import { Text, TouchableHighlight, View } from "react-native"
import CategoryCardStyle from "../../Styles/Components/CategoryCardStyles"
import Base from "../../Styles/Base"

interface IcategoryCard {
    name: string
    categorySelected: string
    callBack: (id: string) => void
}
const CategoryCard = ( props: IcategoryCard ) => {
    const { name, categorySelected, callBack } = props
    return (
        <View style={[CategoryCardStyle.card]} >
        <TouchableHighlight onPress={() => callBack(name)} underlayColor='rgba(0, 0, 0, 0.1)'>
            <View 
                style={[
                    Base.contentCard, 
                    Base.shadow, 
                    CategoryCardStyle.contentCard, 
                    categorySelected === name ? CategoryCardStyle.selected : null]}>
                <Text 
                    style={[
                        CategoryCardStyle.textBase,
                        categorySelected === name ? CategoryCardStyle.selectedText :  CategoryCardStyle.text,
                    ]}>
                    { name }
                </Text>
            </View>
        </TouchableHighlight>
    </View>
    )
}

export default CategoryCard