import {useState, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {styles} from './styles';

import LottieView from 'lottie-react-native'; 
import walletAnimation from '../../assets/wallet-animation.json';
import {COLORS} from '../../theme';
import {Icon} from '@components/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import {formatCurrency} from '@utils/Formatted';

import AsyncStorage from '@react-native-async-storage/async-storage';
const SHOWTOTALVALUE = '@showTotal:cripto';

import {useAuth} from '@hooks/auth';
import {
    getFirestore,
    getDocs,
    collection,
    query,
    where,
} from 'firebase/firestore';

export function CardInvestment(){
    const {user} = useAuth();

    const [showTotal, setShowTotal] = useState(true);
    const [myinvestment, setMyInvestment] = useState(0);
    const [load, setLoad] = useState(false);

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
        loadMyInvestment();
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

    async function loadMyInvestment(){
        const db = getFirestore();
        
        if(!user?.id){
            alert('sem id do user')
            return;
        };
        setLoad(true);
        
        // carregando todos os valores de cada alocação e fazendo a soma total de todos.
        try {
            const allocationsCollectionRef = collection(db, 'allocations');
            const q = query(allocationsCollectionRef, where('userId', '==', user.id));
            const querySnapshot = await getDocs(q);

            let totalInvestment = 0;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const investmentValue = parseFloat(data.investment.replace(/\./g, '').replace(',', '.'));
                totalInvestment += investmentValue;
            });

            setMyInvestment(totalInvestment);
            setLoad(false);
        } catch (error) {
            console.error(error);
            setLoad(false);
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

            <TouchableOpacity
                style={{position: 'absolute', top: RFValue(10), right: RFValue(40)}}
                activeOpacity={0.8}
                onPress={loadMyInvestment}
            >
                <Icon
                    icon='dollar-sign'
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
                
                <Text style={styles.subtitle}>
                    $ {load ? (
                        <ActivityIndicator size={RFValue(20)} color={COLORS.BLACK} />
                    ) : (
                        showTotal ? formatCurrency(myinvestment) : '****'
                    )}
                </Text>

            </View>

        </View>
    )
}