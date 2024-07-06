import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '@screens/home';
import {CriptoDetails} from '@screens/criptoDetails'
import {Register} from '@screens/register';
import {SplashScreenAnimation} from '@screens/SplashScreenAnimation';

import {SignIn} from '@screens/signin';

const Stack = createNativeStackNavigator();

export function Routes(){
    return (
        <Stack.Navigator
            initialRouteName={'splash'}
            screenOptions={{ headerShown: false, animation: 'flip' }}
        >

            <Stack.Screen
                name='home'
                component={Home}
            />
            <Stack.Screen
                name='criptoDetails'
                component={CriptoDetails}
            />
            <Stack.Screen
                name='register'
                component={Register}
            />

            <Stack.Screen
                name='splash'
                component={SplashScreenAnimation}
            />

        </Stack.Navigator>
    )
}