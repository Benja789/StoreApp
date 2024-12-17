import { createContext, Dispatch, SetStateAction } from "react"

export interface IUser {
    email: string
    name: string
    token: string
}

export interface ISettings {
    appVersion: string
    numberVersion: number
    platform: 'ios' | 'android' | 'web' | 'windows' | 'macos' | 'linux'
    height: number
    width: number
}

export interface IModalNotification {
    title: string
    message: string
    open: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    callBack?: () => void
    errorCallBack?: () => void
    showAgree: boolean
    showDisagree: boolean
}

export interface ISnackNotification {
    message: string
    open: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    callBack?: () => void
    errorCallBack?: () => void
}


export interface IAppContext {
    user: IUser | null
    setUser: Dispatch<SetStateAction<IUser | null>>
    logout: () => void

    loader: boolean
    setLoader: Dispatch<SetStateAction<boolean>>

    settings: ISettings
    setSettings: Dispatch<SetStateAction<ISettings>>

    modalNotification: IModalNotification
    setModalNotification: Dispatch<SetStateAction<IModalNotification>>

    snackNotification: ISnackNotification
    setSnackNotification: Dispatch<SetStateAction<ISnackNotification>>
}

const AppContextProvider = createContext<IAppContext>({
    user: null,
    setUser: () => {},

    loader: false,
    setLoader: () => {},

    logout: () => {},
    settings: {
        appVersion: '1.0.0',
        numberVersion: 1,
        platform: 'android',
        height: 0,
        width: 0
    },
    setSettings: () => {},
    modalNotification: {
        title: '',
        message: '',
        open: false,
        type: 'info',
        showAgree: false,
        showDisagree: false
    },
    setModalNotification: () => {},
    snackNotification: {
        message: '',
        open: false,
        type: 'info'
    },
    setSnackNotification: () => {}
})

export default AppContextProvider