import React, { useContext, useEffect } from "react"
import { Image, Modal, Text, TouchableWithoutFeedback, View } from "react-native"
import AppContextProvider from "../../Interfaces/IAppContext"
import SnackStyles from "../../Styles/Components/SnackStyles";

const SnackNotification = () => {
    const appContext = useContext(AppContextProvider)
    
    useEffect(() => {
        if ( appContext.snackNotification?.open ) {
            setTimeout(() => {
                hiddenNotification()
            }, 3000);
        }
    }, [ appContext.snackNotification, appContext.snackNotification?.open ]);

    const hiddenNotification = () => {
        appContext.setSnackNotification((prev) => ({
            ...prev,
            open: false,
        }))
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={appContext.snackNotification?.open}
            onRequestClose={() => {
                appContext.setSnackNotification((prev) => ({
                    ...prev,
                    open: false,
                }))
            }}>
            <TouchableWithoutFeedback onPress={hiddenNotification}>
                <View style={SnackStyles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={SnackStyles.modalView}>
                            {appContext.snackNotification?.type === "error" && <Image style={SnackStyles.imageStyle} source={require(`../../Assets/Icons/error.png`)} />}
                            {appContext.snackNotification?.type === "info" && <Image style={SnackStyles.imageStyle} source={require("../../Assets/Icons/info.png")} />}
                            {appContext.snackNotification?.type === "success" && <Image style={SnackStyles.imageStyle} source={require("../../Assets/Icons/success.png")} />}
                            <Text 
                                style={[
                                    SnackStyles.message,
                                    appContext.snackNotification?.type === "error" && SnackStyles.errorText,
                                    appContext.snackNotification?.type === "info" && SnackStyles.infoText,
                                    appContext.snackNotification?.type === "success" && SnackStyles.successText
                                ]}>
                                {appContext.snackNotification?.message}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default SnackNotification