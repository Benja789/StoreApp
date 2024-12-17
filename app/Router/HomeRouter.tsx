import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Paginas
import Home from '../Pages/Home';

const StackHome = createNativeStackNavigator<any>();

const HomeRouter = () => {
	const baseOptions = {
		headerShown: false
	};
    return (
        <StackHome.Navigator initialRouteName="Home">
            <StackHome.Screen name="Home" component={Home} options={baseOptions}/>
        </StackHome.Navigator>
    )
}

export default HomeRouter   