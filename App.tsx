import {
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from './app/Context/AppContex';
import Loader from './app/Components/Base/Loader';
import AuthRouter from './app/Router/AuthRouter';
import HomeRouter from './app/Router/HomeRouter';
import SnackNotification from './app/Components/Base/SnackNotification';

const Stack = createNativeStackNavigator();

const App = () => {
	const baseOptions = {
		headerShown: false
	};
	return (
		<SafeAreaView style={{flex: 1}}>
			<AppContext>
				<Loader />
				<SnackNotification />
				<StatusBar animated={false} backgroundColor="#FFF" barStyle="dark-content" />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Auth">
						<Stack.Screen name="Auth" component={AuthRouter} options={baseOptions}/>
						<Stack.Screen name="Home" component={HomeRouter} options={baseOptions}/>
					</Stack.Navigator>
				</NavigationContainer>
			</AppContext>
		</SafeAreaView>
	);
}

export default App;
