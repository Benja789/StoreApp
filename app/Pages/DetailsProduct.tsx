import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, Text, View, ScrollView } from "react-native"
import Base from "../Styles/Base";
import { apiGetData } from "../Services/api";
import Environmet from "../Env/Api";
import AppContextProvider from "../Interfaces/IAppContext";
import DetailsProductsStyle from "../Styles/Pages/DetailsProductsStyle";
import CustomButton from "../Components/Base/CustomButton";
import IconButton from "../Components/Base/IconButton";
import { useNavigation } from "@react-navigation/native";

const DetailsProduct = ({ route }:any) => {
    const { id } = route.params;
    const navigation = useNavigation<any>()
    const appContext = useContext(AppContextProvider)
    const [loader, setLoader] = useState(true)
    const [product, setProduct] = useState<any>({})
    const [label, setLabel] = useState("Agregar")

    useEffect(() => {
        changeLabel()
    }, [product, appContext.carts])

    useEffect(()=> {
        getProduct() 
    }, [])

    // Metodo para obtener los productos
    const getProduct = async() => {
        let response = await apiGetData({
            url: `${Environmet.API}${Environmet.ENDPOINTS.PRODUCTS}/${id}`,
            setLoader: setLoader
        })

        if (!response.error) {
            setProduct(response.data)
        }
        else {
            appContext.setSnackNotification({
                open: true,
                message: "Error al obtener el producto",
                type: "error"
            })   
        }
    }

    const addToCart = () => {
        appContext.addCart({...product, quantity: 1})

    }

    const changeLabel = () => {
        let flag = appContext.carts.find((item: any) => item.id === product.id)
        if ( flag ) setLabel(`Añadir más (${flag.quantity})`)
        else setLabel("Agregar al carrito")
    }
    // Metodo para navegar para atras
    const goBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={[ Base.safeAreaContainer ]}>
            <ScrollView>
                {
                    loader ? 
                        <ActivityIndicator size="large" color="#000" />
                    :
                        <View style={Base.bodyContainer}>
                            <View style={DetailsProductsStyle.backButton}>
                                <IconButton 
                                    icon={require("../Assets/Icons/arrow-left.png")}
                                    callBack={goBack} />
                            </View>
                            <Image source={{ uri: product.image }} style={ DetailsProductsStyle.image } />
                            <Text style={[Base.textTitleH1, DetailsProductsStyle.title ]}>{product.title}</Text>

                            <View style={DetailsProductsStyle.qualificationContainer}>
                                <View style={[Base.shadow, DetailsProductsStyle.pointsContainer]}>
                                    <Image style={DetailsProductsStyle.iconStar} source={require("../Assets/Icons/raking.png")}/>
                                    <Text style={[Base.textTitleH3]}>{ product.rating.rate }</Text>
                                </View>
                                <View style={[Base.shadow, DetailsProductsStyle.pointsContainer]}>
                                    <Image style={DetailsProductsStyle.iconStar} source={require("../Assets/Icons/show.png")}/>
                                    <Text style={[Base.textTitleH3 ]}>{ product.rating.count }</Text>
                                </View>

                            </View>

                            <Text style={[ Base.textP ]}>{product.description}</Text>
                        </View>
                }
            </ScrollView>
            {
                !loader &&  
                    <View style={DetailsProductsStyle.containterButton}>
                        <View>
                            <Text style={[Base.textTitleH3 ]}>Precio</Text>
                            <Text style={[Base.textTitleH2 ]}>$ {appContext.formatedPrice(product.price)}</Text>
                        </View>
                        <CustomButton text={label} buttonStyle={{ maxWidth: 200 }} callBack={addToCart} />
                    </View>
            }
            <View style={{ height: 80 }}></View>
        </SafeAreaView>
    )
}

export default DetailsProduct