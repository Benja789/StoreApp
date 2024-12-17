import {
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from './app/Context/AppContex';
import Loader from './app/Components/Base/Loader';
import AuthRouter from './app/Router/AuthRouter';
import TabsRouter from './app/Router/Tabs';
import SnackNotification from './app/Components/Base/SnackNotification';
import LoaderApp from './app/Components/Base/LoaderApp';

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
					<Stack.Navigator initialRouteName="Loader">
						<Stack.Screen name="Loader" component={LoaderApp} options={baseOptions}/>
						<Stack.Screen name="Auth" component={AuthRouter} options={baseOptions}/>
						<Stack.Screen name="Tabs" component={TabsRouter} options={baseOptions}/>
					</Stack.Navigator>
				</NavigationContainer>
			</AppContext>
		</SafeAreaView>
	);
}

export default App;
