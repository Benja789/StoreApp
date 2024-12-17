import { Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "../Components/Base/CustomButton"
import { CommonActions, useNavigation } from "@react-navigation/native"
import AppContextProvider from "../Interfaces/IAppContext"
import { useContext } from "react"
import Base from "../Styles/Base"
import ProfileStyle from "../Styles/Pages/ProfileStyle"

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
        <SafeAreaView style={[ Base.safeAreaContainer ]}>
            <Text style={[ Base.textTitleH1, ProfileStyle.title ]}>Perfil</Text>
            <Image source={require("../Assets/Icons/Tabs/profile.png")} style={ProfileStyle.image} />

            <View style={ProfileStyle.infoContainer}>
                <Text style={[Base.textTitleH3]}>Nombre</Text>
                <Text>{appContext.user?.name}</Text>
                <View style={Base.separator}/>

                <Text style={[Base.textTitleH3]}>Nombre de usuario</Text>
                <Text>{appContext.user?.username}</Text>
                <View style={Base.separator}/>

            </View>

            <View style={ProfileStyle.buttonContainer}>
                <CustomButton 
                    text="Cerrar sesión"
                    buttonStyle={{  maxWidth: 300 }}
                    callBack={logout} />
            </View>
        </SafeAreaView>
    )
}

export default Profile