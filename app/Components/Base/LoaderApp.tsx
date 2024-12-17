import { useContext, useEffect } from "react"
import LoaderKit from 'react-native-loader-kit'
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../Styles/Colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AppContextProvider from "../../Interfaces/IAppContext"
import { CommonActions, useNavigation } from "@react-navigation/native"

const LoaderApp = () => {
    const appContext = useContext(AppContextProvider)
    const navigation = useNavigation<any>()

    // Funcion OnLoader para validar el inicio de sesion
    useEffect(() => {
        session()
    }, [])

    const session = async() => {
        try {
            let user:any = await AsyncStorage.getItem("user")
            let navigate:any = {}
            user = user ? JSON.parse(user) : null
            console.log(user)
            if ( user !== null ) {
                appContext.setUser({
                    username: user.username ?? "",
                    name: user.name ?? "",
                    token: user.token ?? ""
                })
                navigate = {
                    index: 0,
                    routes: [{ name: "Tabs", state: { routes: [{ name: "Home" }] }}]
                }
            } else {
                navigate = {
                    index: 0,
                    routes: [{ name: "Auth", state: { routes: [{ name: "Login" }] }}]
                }
            }
            setTimeout(() => {
                navigation.dispatch(CommonActions.reset(navigate))
            }, 700)
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background}}>
            <LoaderKit
                style={{ width: 50, height: 50 }}
                name={'BallPulse'}
                color={Colors.primary} /> 
        </SafeAreaView>
    )
}

export default LoaderApp