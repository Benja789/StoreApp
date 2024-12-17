import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "../Components/Base/CustomButton"
import { CommonActions, useNavigation } from "@react-navigation/native"
import AppContextProvider from "../Interfaces/IAppContext"
import { useContext } from "react"

const Profile = () => {
    const navigate = useNavigation<any>()
    const appContext = useContext(AppContextProvider)

    const logout = () => {
        console.log("Cerrar sesión")
        appContext.setUser(null)
        navigate.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: "Auth", state: { routes: [{ name: "Login" }] }}]
        }))
    }
    
    return (
        <SafeAreaView>
            <CustomButton 
                text="Cerrar sesión"
                callBack={logout} />
        </SafeAreaView>
    )
}

export default Profile