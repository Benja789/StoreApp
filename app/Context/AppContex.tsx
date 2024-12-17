import React, { useState } from "react"
import AppContextProvider, { IModalNotification, ISettings, ISnackNotification, IUser } from "../Interfaces/IAppContext"
import { Dimensions, Platform } from "react-native"

const AppContext = ({children}: { children?: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [loader, setLoader] = useState<boolean>(false)
    const [settings, setSettings] = useState<ISettings>({
        appVersion: '1.0.0',
        numberVersion: 1,
        platform: Platform.OS,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    })
    const [modalNotification, setModalNotification] = useState<IModalNotification>({
        title: '',
        message: '',
        open: false,
        type: 'info',
        showAgree: false,
        showDisagree: false
    })
    const [snackNotification, setSnackNotification] = useState<ISnackNotification>({
        message: '',
        open: false,
        type: 'info'
    })

    const logout = () => {
        setUser(null)
    }

    const values = {
        user,
        setUser,
        logout,
        loader,
        setLoader,
        settings,
        setSettings,
        modalNotification,
        setModalNotification,
        snackNotification,
        setSnackNotification
    }

    return (
        <AppContextProvider.Provider value={values}>
            { children }
        </AppContextProvider.Provider>
    )
}


export default AppContext