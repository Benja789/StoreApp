import { useContext } from "react"
import { Button, SafeAreaView, Text, View } from "react-native"
import AppContextProvider from "../../Interfaces/IAppContext"

const Login = () => {
    const appContext = useContext(AppContextProvider)

    const showSnack = () => {
        appContext.setSnackNotification({
            message: 'Hello World',
            open: true,
            type: 'info'
        })
    }
    return (
        <SafeAreaView>
            <View>
                <Text>Login</Text>
            </View>
        </SafeAreaView>
    )
}

export default Login