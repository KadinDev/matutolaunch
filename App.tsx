
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import {useFonts, DancingScript_500Medium} from '@expo-google-fonts/dancing-script';
import {Inter_400Regular} from '@expo-google-fonts/inter';

import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './src/routes';

import {AuthProvider} from '@hooks/auth';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    DancingScript_500Medium,
    Inter_400Regular
  });
  
  if(fontsLoaded){
    SplashScreen.hideAsync();
  } else {
    return
  };


  return (
    <NavigationContainer>
      <StatusBar style='dark' translucent backgroundColor='transparent' />
      
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    
    </NavigationContainer>
  );
}
