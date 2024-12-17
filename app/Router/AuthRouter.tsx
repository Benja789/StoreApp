import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login';

const AuthStack = createNativeStackNavigator<any>();

const AuthRouter = () => {
	const baseOptions = {
		headerShown: false
	};
    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={Login} options={baseOptions}/>
        </AuthStack.Navigator>
    )
}

export default AuthRouter