import {useState, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity
} from 'react-native';

import {styles} from './styles';

import LottieView from 'lottie-react-native'; 
import walletAnimation from '../../assets/wallet-animation.json';
import {COLORS} from '../../theme';
import {Icon} from '@components/Icon';

import AsyncStorage from '@react-native-async-storage/async-storage';
const SHOWTOTALVALUE = '@showTotal:cripto';

export function CardInvestment(){
    const [showTotal, setShowTotal] = useState(true);

    useEffect(() => {
        async function loadShowTotal(){
            try {
                const value = await AsyncStorage.getItem(SHOWTOTALVALUE);
                if(value !== null){
                    setShowTotal(JSON.parse(value));
                };
            } catch (error) {
                console.error(error);
            };
        };

        loadShowTotal();
    },[]);

    async function handleShowTotal(){
        try {
            const newValue = !showTotal;
            setShowTotal(newValue);
            await AsyncStorage.setItem(SHOWTOTALVALUE, JSON.stringify(newValue));
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 10 }}
                onPress={handleShowTotal}
            >
                <Icon
                    icon={showTotal ? 'eye' : 'eye-off'}
                    color={COLORS.BLACK}
                />
            </TouchableOpacity>

            <LottieView
                style={styles.wallet}
                source={walletAnimation}
                autoPlay
                loop
            />
            <View style={styles.details}>
                <Text style={styles.title}> total investido </Text>
                <Text style={styles.subtitle}> $ {showTotal ? '1.500' : '****'}  </Text>
            </View>

        </View>
    )
}