import { useContext, useState } from "react"
import { KeyboardAvoidingView, Text, TextInput, View, ScrollView } from "react-native"
import AppContextProvider from "../../Interfaces/IAppContext"
import Base from "../../Styles/Base"
import LoginStyles from "../../Styles/Pages/LoginStyles"
import CustomButton from "../../Components/Base/CustomButton"
import { SafeAreaView } from "react-native-safe-area-context"
import IconButton from "../../Components/Base/IconButton"
import { apiPostData } from "../../Services/api"
import Environmet from "../../Env/Api"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Colors } from "react-native/Libraries/NewAppScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from "@react-navigation/native"


const Login = () => {
    const appContext = useContext(AppContextProvider)
    const navigation = useNavigation<any>()
    const [saveSession, setSaveSession] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: ""
    })

    const login = async() => {
        setErrorMessage(() =>({
            email: "",
            password: ""
        }))
        if ( formData.email === "" || formData.password === "") {
            setErrorMessage({
                email: "El  usuario es obligatorio",
                password: "La contraseña es obligatoria"
            })
            return
        }
        let response =  await apiPostData({
            url: `${Environmet.API}${Environmet.ENDPOINTS.LOGIN}`,
            body: {
                username: formData.email,
                password: formData.password
            },
            setLoader: appContext.setLoader
        })

        if ( response.error  ) {
            if ( response.data.includes("username or password is incorrect") ) {
                appContext.setSnackNotification({
                    open: true,
                    message: "Usuario o contraseña incorrectos",
                    type: "error"   
                })
            } else {
                appContext.setSnackNotification({
                    open: true,
                    message: "Ocurrio un error inesperado",
                    type: "error"
                })
            }
        } else {
            appContext.setUser({
                username: formData.email,
                name: formData.email,
                token: response.data.token
            })

            if ( saveSession ) {
                try {
                    await AsyncStorage.setItem("user", JSON.stringify({
                        username: formData.email,
                        name: formData.email,
                        token: response.data.token
                    }))
                } catch (error) {
                    appContext.setSnackNotification({
                        open: true,
                        message: "No se logro guardar la sesion en el dispositivo, revisa los permisos de la App",
                        type: "warning"
                    })
                }
            }
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: "Tabs", state: { routes: [{ name: "Home" }] }}]
            }))
            
        }

    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={appContext.settings.platform === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={appContext.settings.platform === "ios" ? 1 : undefined}>
            <ScrollView contentContainerStyle={Base.safeAreaContainer}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[Base.card, LoginStyles.cardLogin, { margin: "auto",  alignItems: 'center' }]}>
                        <View style={[Base.titleCard]}>
                            <Text style={[Base.textTitleH1]}>Iniciar sesion</Text>
                        </View>
                        <View style={[Base.contentCard]}>
                            <Text style={[Base.textP, { textAlign: "left" }]}>Codigo de usuario</Text>
                            <TextInput
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                value={formData.email}
                                autoCapitalize="none"
                                placeholder="benjamin"
                                placeholderTextColor="#a3a3a3" 
                                style={Base.inputText} />
                            {
                                errorMessage.email !== "" &&
                                <Text style={[  Base.errorText, ]}>{errorMessage.email}</Text>
                            }

                            <Text style={[Base.textP, { textAlign: "left", marginTop: 20 }]}>Contraseña</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextInput
                                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                                    value={formData.password}
                                    autoCapitalize="none"
                                    placeholderTextColor="#a3a3a3" 
                                    placeholder="Contraseña"
                                    secureTextEntry={!showPassword}
                                    style={[Base.inputText, { width: "80%"}]} />
                                {
                                    !showPassword ?
                                        <IconButton 
                                            icon={require("../../Assets/Icons/hidden.png")}
                                            callBack={()=> setShowPassword(prev => !prev)}/>
                                        :

                                        <IconButton 
                                            icon={require("../../Assets/Icons/show.png")}
                                            callBack={()=> setShowPassword(prev => !prev)}/>
                                }
                            </View>
                            {
                                errorMessage.password !== "" &&
                                <Text style={[ Base.errorText]}>{errorMessage.password}</Text>
                            }

                            <BouncyCheckbox
                                size={25}
                                style={{ marginTop: 20 }}
                                fillColor={Colors.primary}
                                unFillColor="#FFFFFF"
                                text="Deseo guardar mi sesión"
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular",  textDecorationLine: "none"  }}
                                onPress={(isChecked: boolean) => setSaveSession(isChecked)}/>

                        </View>
                        <View style={[Base.actionCard]}>
                            <CustomButton
                                text="Iniciar sesion"
                                callBack={login} />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login