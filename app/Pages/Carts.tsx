import { Text, View, ScrollView, Image} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Base from "../Styles/Base"
import { useContext, useEffect, useState } from "react"
import AppContextProvider from "../Interfaces/IAppContext"
import CustomButton from "../Components/Base/CustomButton"
import CartsStyles from "../Styles/Pages/CartsStyle"
import { useNavigation } from "@react-navigation/native"

const Carts = () => {
    const appContext = useContext(AppContextProvider)
    const navigate = useNavigation<any>()

    useEffect(() => {
        appContext.calculateTotal()
    }, [appContext.carts.length])

    const saveOrder = () => {
        appContext.setLoader(true)

        setTimeout(() => {
            appContext.setLoader(false)
            appContext.setSnackNotification({
                open: true,
                message: "Pedido realizado con exito",
                type: "success"
            })
            appContext.setCarts([])
            navigate.navigate("Home", { screen: "Home" })
        }, 3000)
    }

    return (
        <SafeAreaView style={[ Base.safeAreaContainer ]}>
            <ScrollView>
                {
                    appContext.carts.length === 0 ?
                        <View style={Base.bodyContainer}>
                            <Text style={[Base.textTitleH1, { textAlign: "center", marginTop: 50 }]}>No hay productos en el carrito</Text>
                        </View>
                    :
                        appContext.carts.map((item: any, index: number) => (
                            <View  key={index} style={[Base.card, CartsStyles.containerCard]}>
                                <View style={[ CartsStyles.details ]}>
                                    <Image source={{ uri: item.image }} style={CartsStyles.image} />
                                    <View style={CartsStyles.textDescription}>
                                        <Text style={[Base.textTitleH3, { textAlign:"left"}]}>{item.title}</Text>
                                        <Text style={[Base.textP, { textAlign:"left"}]}>${appContext.formatedPrice(item.price)}</Text>
                                        <CustomButton 
                                            text="Eliminar" 
                                            buttonStyle={ Base.buttonDelete }
                                            textStyle={ Base.textButtonDelete }
                                            icon={require("../Assets/Icons/delete-red.png")}
                                            callBack={() => appContext.removeCart(item.id)} />
                                    </View>
                                </View>
                                <View style={Base.separator}/>
                                <Text style={[Base.textP, { textAlign:"left"}]}>Cantidad:</Text>
                                <View style={CartsStyles.actions}>
                                    <CustomButton
                                        text="-"
                                        buttonStyle={{ width: 80}}
                                        callBack={() => appContext.changeQuantityCart(item, "remove")} />
                                    <Text style={[Base.textP, { textAlign:"left"}]}>{item.quantity}</Text>
                                    <CustomButton
                                        text="+"
                                        buttonStyle={{ width: 80}}
                                        callBack={() => appContext.changeQuantityCart(item, "add")} />
                                </View>
                            </View>
                        ))
                }
            </ScrollView>
            {
                appContext.carts.length > 0 &&
                    <CustomButton text={`Pagar $ ${appContext.formatedPrice(appContext.total)}`} callBack={saveOrder}/>
            }
            <View style={{ height: 80 }} />
        </SafeAreaView>
    )
}

export default Carts