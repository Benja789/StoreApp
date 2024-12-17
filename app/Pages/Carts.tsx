import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Base from "../Styles/Base"

const Carts = () => {
    return (
        <SafeAreaView style={[ Base.safeAreaContainer ]}>
            <Text>Carts</Text>
        </SafeAreaView>
    )
}

export default Carts