import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Base from "../Styles/Base"
import { useContext, useEffect, useState } from "react"
import AppContextProvider from "../Interfaces/IAppContext"
import HomeStyles from "../Styles/Pages/HomeStyles"
import { apiGetData } from "../Services/api"
import Environmet from "../Env/Api"
import CategoryCard from "../Components/Home/CategoryCard"


const Home = () => {
    const appContext = useContext(AppContextProvider)
    const [categories, setCategories] = useState<string[]>([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // Controladores de las vistas
    const [categorySelected, setCategorySelected] = useState("Todas")

    useEffect(()=> {
        const controller = new AbortController()
        getDataInitial(controller.signal)
        return () => {
            controller.abort()
        }
    },[])

    // Metodo para refrescar toda la informacion
    const getDataInitial = (signal: AbortSignal) => {
        getCategory(signal)
    }

    const getCategory = async(signal: AbortSignal) => {
        let response = await apiGetData({
            url: `${Environmet.API}${Environmet.ENDPOINTS.CATEGORIES}`,
            signal: signal,
            setLoader: setLoading
        })
        console.log(JSON.stringify(response))
        if ( !response.error ) {
            setCategories(()=>["Todas", ...response.data])
        }
    }

    return (
        <SafeAreaView style={[ Base.safeAreaContainer ]}>
            <ScrollView>
                <View style={HomeStyles.titleContainer}>
                    <Text style={[Base.textTitleH1]}>Hola, { appContext.user?.name }</Text>
                    <Text style={[Base.textP]}>Bienvenido a tu aplicación de ropa</Text>
                </View>
                { 
                    loading ? 
                        <ActivityIndicator size="large" color="#000" /> 
                        :
                        <View>
                            <FlatList 
                                data={categories}
                                horizontal
                                keyExtractor={(item:any) => item.id}
                                renderItem={({item}) => (
                                    <CategoryCard 
                                        name={item}
                                        categorySelected={categorySelected}
                                        callBack={setCategorySelected}/>
                                )}
                            />
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home