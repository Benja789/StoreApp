import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Paginas
import Home from '../Pages/Home';
import DetailsProduct from '../Pages/DetailsProduct';

const HomeStack = createNativeStackNavigator();

const HomeRouter = () => {

    const baseOptions = {
        headerShown: false
    }

    return (
        <HomeStack.Navigator initialRouteName='Index'>
            <HomeStack.Screen name='Index' component={Home} options={baseOptions}/>
            <HomeStack.Screen name='DetailsProduct' component={DetailsProduct} options={baseOptions}/>
        </HomeStack.Navigator>
    );
}

export default HomeRouter;
