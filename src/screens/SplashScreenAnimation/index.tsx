import { useEffect, useState } from 'react';

import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import LottieView from 'lottie-react-native';
import btcAnimation from '../../assets/btc-animation.json';

import { COLORS, FONTS } from '@src/theme';
import {useNavigation} from '@react-navigation/native';
import { Icon } from '@src/components/Icon';


export function SplashScreenAnimation(){
    const navigation = useNavigation();
    const [countdown, setCountdown] = useState(2);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if(countdown === 0){
            navigation.navigate('home');
            setLoad(false);
            return;
        };

        if(load){
            const countdownInterval = setInterval(() => {
                setCountdown(prevCount => prevCount - 1);
            }, 1000);

            return () => clearInterval(countdownInterval);
        };
    },[countdown, load]);


    return (
        <View style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: COLORS.WHITE_100,
            flexDirection: 'column',
            paddingHorizontal: RFValue(20)
        }}>
            <LottieView
                style={{
                    width: RFValue(200),
                    height: RFValue(200)
                }}
                source={btcAnimation}
                autoPlay
                loop={false}
            />

            <Text style={{
                fontSize: RFValue(14),
                color: COLORS.BLACK,
                textTransform: 'uppercase',
                fontFamily: FONTS.TEXT,
                fontWeight: 'bold',
            }}> 
                matuto 
            </Text>

            <Text style={{
                fontSize: RFValue(30),
                color: COLORS.BLACK,
                fontFamily: FONTS.TITLE,
                opacity: 0.7,
                marginTop: RFValue(-10)
            }}>  
                launchpad 
            </Text>

            <TouchableOpacity
                style={{
                    width: RFValue(40),
                    height: RFValue(40),
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: RFValue(5)
                }}

                activeOpacity={0.8}
                onPress={() => navigation.navigate('home')}
            >
                <Icon
                    icon='arrow-right'
                    color={COLORS.BLACK}
                />
            </TouchableOpacity>
        </View>
    )
}