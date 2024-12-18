import { View, Text, TextInput, ActivityIndicator, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Base from "../Styles/Base"
import { useContext, useEffect, useState, useCallback } from "react"
import AppContextProvider from "../Interfaces/IAppContext"
import HomeStyles from "../Styles/Pages/HomeStyles"
import { apiGetData } from "../Services/api"
import Environmet from "../Env/Api"
import CategoryCard from "../Components/Home/CategoryCard"
import CardProduct from "../Components/Home/CardProduct"
import CustomButton from "../Components/Base/CustomButton"

const Home = () => {
    const appContext = useContext(AppContextProvider)
    const [categories, setCategories] = useState<string[]>([])
    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [loading, setLoading] = useState(true)

    // Controladores de las vistas
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false)
    const [categorySelected, setCategorySelected] = useState("Todas")
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState({ editingIndex: 1, text: '' })

    useEffect(() => {

        const controller = new AbortController()
        getDataInitial(controller.signal)
        return () => {
            controller.abort()
        }
    }, [])

    // Metodo para refrescar toda la informacion
    const getDataInitial = (signal: AbortSignal) => {
        getCategory(signal)
        getProducts(signal)
    }

    // Metodo para obtener las categorias
    const getCategory = async (signal: AbortSignal) => {
        let response = await apiGetData({
            url: `${Environmet.API}${Environmet.ENDPOINTS.CATEGORIES}`,
            signal: signal,
            setLoader: setLoading
        })
        if (!response.error) {
            setCategories(() => ["Todas", ...response.data])
        }
    }

    const findProduct = useCallback((text: string) => {
        setSearch({ editingIndex: -1, text: text });
        let data = products;
        if (categorySelected !== "Todas") {
            data = data.filter((item: any) => item.category === categorySelected);
        }
        if (text !== "") {
            data = data.filter((item: any) => item.title.toLowerCase().includes(text.toLowerCase()));
        }
        setProductsFiltered(data);
    }, [products, categorySelected]);

    // Metodo para obtener los productos
    const getProducts = async (signal: AbortSignal, scroll?: boolean) => {
        let newValueLimit = limit + 5
        let request: any = {
            url: `${Environmet.API}${Environmet.ENDPOINTS.PRODUCTS}`,
            signal: signal,
            params: {
                limit: limit
            }
        }
        if (scroll === true) {
            request.params.limit = newValueLimit
            setLimit(newValueLimit)
            request.setLoader = setInfiniteScrollLoading
        } else request.setLoader = setLoading

        let response = await apiGetData(request)

        if (!response.error) {
            setProducts(() => {
                let data = response.data
                if (categorySelected !== "Todas") data = data.filter((item: any) => item.category === categorySelected)
                setProductsFiltered(data)
                return response.data
            })
        }
    }

    const changeCategory = (category: string) => {
        setCategorySelected(category)
        setProducts(() => {
            let data = products
            if (category !== "Todas") data = data.filter((item: any) => item.category === category)
            setProductsFiltered(data)
            return products
        })
    }

    // Metodo para el scroll infinito
    const infiniteScroll = async () => {
        setInfiniteScrollLoading(() => {
            getProducts(new AbortController().signal, true)
            return true
        });
    }

    // Cabecera del componente
    const renderHeader = () => (
        <View>
            <FlatList
                data={categories}
                key={1}
                horizontal
                keyExtractor={(item: any) => item}
                renderItem={({ item, index }: { item: string, index: number }) => (
                    <CategoryCard
                        key={index}
                        name={item}
                        categorySelected={categorySelected}
                        callBack={() => changeCategory(item)} />
                )} />
        </View>
    )

    // Footer del compomente
    const renderFooter = () => (
        <View>
            {infiniteScrollLoading && <ActivityIndicator size="large" color="#000" />}
            <CustomButton text="Cargar más" callBack={infiniteScroll} />
            <View style={{ height: 120 }} />
        </View>
    );

    // Para cuando no tiene productos
    const emptyList = () => (
        <View style={[Base.contentCard]}>
            <Text style={[Base.textP]}>No hay productos disponibles</Text>
        </View>
    )

    return (
        <SafeAreaView style={[Base.safeAreaContainer]}>
            <View style={HomeStyles.titleContainer}>
                <Text style={[Base.textTitleH1]}>Hola, {appContext.user?.name}</Text>
                <Text style={[Base.textP]}>Bienvenido a StoreApp</Text>
                <TextInput
                    value={search.text}
                    keyboardType="default"
                    onChangeText={(e) => findProduct(e)}
                    placeholder="Buscar productos"
                    style={HomeStyles.searchInput} />
            </View>

            {
                loading ?
                    <ActivityIndicator size="large" color="#000" />
                    :
                    <FlatList
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={emptyList}
                        data={productsFiltered}
                        numColumns={2}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                        key={2}
                        columnWrapperStyle={HomeStyles.row}
                        // onEndReachedThreshold={0.8}
                        // onEndReached={infiniteScroll}
                        // ListFooterComponent={infiniteScrollLoading ? <ActivityIndicator size="large" color="#000" /> : null} 
                        renderItem={({ item, index }: { item: any, index: number }) => (
                            <CardProduct key={index} product={item} />
                        )} />
            }
        </SafeAreaView>
    )
}

export default Home