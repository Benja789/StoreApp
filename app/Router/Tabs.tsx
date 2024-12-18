import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Paginas
import Home from '../Pages/Home';
import { useContext, useEffect, useRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import TabRouterStyles from '../Styles/TabStyles';
import Profile from '../Pages/Profile';
import Carts from '../Pages/Carts';
import HomeRouter from './HomeRouter';
import AppContextProvider from '../Interfaces/IAppContext';

const Tab = createBottomTabNavigator();

const ButtonTab = ({item, accessibilityState, onPress}:any) => {
    const appContext = useContext(AppContextProvider)
    const animatedValues = {
        translate: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0)).current,
    }

    const { translate, scale } = animatedValues

    useEffect(() => {
        handleAnimated()
    }, [accessibilityState.selected])

    const handleAnimated = () => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 400,
                useNativeDriver: false
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 250,
                useNativeDriver: false
            })
        ]).start()
    }

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    return (
        <TouchableOpacity
        onPress={onPress}
        style={TabRouterStyles.container} >
            <Animated.View
                style={[TabRouterStyles.button, translateStyles]} >
                    {
                        item.screen === "Carts" && appContext.carts.length > 0 &&
                            <View style={TabRouterStyles.containerBadge}>
                                <Text style={TabRouterStyles.textBadge}>{ appContext.carts.length }</Text>
                            </View>
                    }
                    <Image source={item.icon} style={{ width: 30, height: 30}}/>
            </Animated.View>
            <Text 
                style={[
                    TabRouterStyles.title, 
                    { 
                        color: accessibilityState.selected ? '#3B6840' : '#000',
                        fontFamily: accessibilityState.selected ? 'Poppins-Bold' : 'Poppins'
                    } 
                ]}> {item.title} </Text>
        </TouchableOpacity>
    )
}


const TabsRouter = () => {
    const baseOptions = {
        headerShown: false,
        tabBarStyle: TabRouterStyles.tabBarStyle
    }
    const ListComponent:any = [
        {
            screen : "Home",
            component: HomeRouter,
            icon: require('../Assets/Icons/Tabs/home.png'),
        },{
            screen: "Carts",
            component: Carts,
            icon: require('../Assets/Icons/Tabs/cart.png'),
        }, {
            screen: "Profile",
            component: Profile,
            icon: require('../Assets/Icons/Tabs/profile.png'),
        }
    ]

    return (
        <Tab.Navigator screenOptions={baseOptions}>            
        {
                ListComponent.map((item: any, i: number) => (
                    <Tab.Screen
                        key={i}
                        name={item.screen}
                        component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarButton: (props) => <ButtonTab item={item} {...props} />
                        }} />
                ))
            }
        </Tab.Navigator>
    )
}

export default TabsRouter   