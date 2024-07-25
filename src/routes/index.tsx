import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '@screens/home';
import {CriptoDetails} from '@screens/criptoDetails'
import {Register} from '@screens/register';
import {SplashScreenAnimation} from '@screens/SplashScreenAnimation';

import {SignIn} from '@screens/signin';

import {useAuth} from '@hooks/auth';

const {Group, Screen, Navigator} = createNativeStackNavigator();

export function Routes(){

    const {user} = useAuth();

    return (
        <Navigator
            initialRouteName={'splash'}
            screenOptions={{ headerShown: false, animation: 'flip' }}
        >
            { user ? (
                <Group>
                    <Screen
                        name='splash'
                        component={SplashScreenAnimation}
                    />
                    <Screen
                        name='home'
                        component={Home}
                    />
                    <Screen
                        name='criptoDetails'
                        component={CriptoDetails}
                    />
                    <Screen
                        name='register'
                        component={Register}
                    />
                </Group>

            ) : (

                <Screen
                    name='login'
                    component={SignIn}
                />
            ) }
            

            

        </Navigator>
    )
}