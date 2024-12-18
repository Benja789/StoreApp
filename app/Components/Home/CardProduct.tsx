import { Text, View, Image, TouchableOpacity } from "react-native";
import Base from "../../Styles/Base";
import { useContext, useEffect, useState } from "react";
import AppContextProvider from "../../Interfaces/IAppContext";
import CustomButton from "../Base/CustomButton";
import { useNavigation } from "@react-navigation/native";

const CardProduct = ({ product }: any) => {
    const appContext = useContext(AppContextProvider)
    const navigate = useNavigation<any>()
    const [label, setLabel] = useState("Agregar")

    useEffect(() => {
        let flag = appContext.carts.find((item: any) => item.id === product.id)
        if ( flag ) setLabel(`Añadir más (${flag.quantity})`)
        else setLabel("Agregar")
    }, [appContext.carts])

    const navigateToDetails = () => {
        navigate.navigate("DetailsProduct", { id: product.id })
    }

    const addProduct = () => {
        appContext.addCart({...product, quantity: 1})
    }
    return (
        <TouchableOpacity onPress={navigateToDetails} style={[Base.card, { margin: 10,  alignItems: 'center', padding: 20, width: "45%" }]}>
                <Image source={{ uri: product.image }} style={{ width: 130, height: 130 }} />
                <View style={{ marginVertical: 10 }}>
                    <Text style={[Base.textTitleH3, { textAlign:"left"}]}>{product.title}</Text>
                </View>
                <View style={{  width: "100%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[Base.textP, { textAlign:"left"}]}>Precio:</Text>
                        <Text style={[Base.textP, { textAlign:"left"}]}>${appContext.formatedPrice(product.price)}</Text>
                    </View>
                    <CustomButton 
                        text={label}
                        buttonStyle={{ width:"90%"}}
                        textStyle={{ fontSize: 12 }}
                        callBack={addProduct}/>
                </View>
        </TouchableOpacity>
   );
}

export default CardProduct;