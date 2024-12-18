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
    const [carts, setCarts] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)

    const addCart = (cart: any) => {
        let cartIndex = carts.findIndex( item => item.id === cart.id)
        if (cartIndex === -1) {
            setCarts([...carts, cart])
        } else {
            carts[cartIndex].quantity += 1
            setCarts([...carts])
        }
        calculateTotal()
    }

    const removeCart = (cart: any) => {
        let cartIndex = carts.findIndex( item => item.id === cart.id)
        console.log(cartIndex)
        if (carts[cartIndex]?.quantity > 1) {
            carts[cartIndex].quantity -= 1
            setCarts([...carts])
        } else {
            carts.splice(cartIndex, 1)
            setCarts([...carts])
            setSnackNotification({
                open: true,
                message: "Producto eliminado del carrito",
                type: "success"
            })
        }
        calculateTotal()
    }

    const changeQuantityCart = (cart: any, type: string) => {
        let cartIndex = carts.findIndex( item => item.id === cart.id)
        if (type === 'add') {
            carts[cartIndex].quantity += 1
            setCarts([...carts])
        } else {
            if (carts[cartIndex]?.quantity > 1) {
                carts[cartIndex].quantity -= 1
                setCarts([...carts])
            } else {
                carts.splice(cartIndex, 1)
                setCarts([...carts])
                setSnackNotification({
                    open: true,
                    message: "Producto eliminado del carrito",
                    type: "success"
                })
            }
        }
        calculateTotal()
    }

    const logout = () => {
        setUser(null)
    }

    // Metodo para formatear el precio
    const formatedPrice = ( number: number ) => (Math.round(number * 100) /100 ).toFixed(2)

    const calculateTotal = () => {
        let totalCalulate = 0
        carts.forEach( item => {
            totalCalulate += item.price * item.quantity
        })
        setTotal(totalCalulate)
        return totalCalulate
    }

    const values = {
        user,
        setUser,
        logout,
        loader,
        setLoader,
        carts,
        setCarts,
        addCart,
        total,
        setTotal,
        calculateTotal,
        removeCart,
        changeQuantityCart,
        settings,
        setSettings,
        modalNotification,
        setModalNotification,
        snackNotification,
        setSnackNotification,
        formatedPrice
    }

    return (
        <AppContextProvider.Provider value={values}>
            { children }
        </AppContextProvider.Provider>
    )
}


export default AppContext