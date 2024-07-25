import {useState, useEffect} from 'react';

import {
    View, 
    Text, 
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';

import {styles} from './styles';
import {useRoute} from '@react-navigation/native';
import {CriptoDTO} from '../../dtos/CriptoDTO';
import { RFValue } from 'react-native-responsive-fontsize';
import {Icon} from '@components/Icon';
import { COLORS, FONTS } from '@src/theme';
import {useNavigation} from '@react-navigation/native';

import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore';

interface RouteParams {
    cripto: CriptoDTO;
};

export function CriptoDetails(){

    const route = useRoute();
    const {cripto} = route.params as RouteParams;
    const navigation = useNavigation();

    const [payment, setPayment] = useState('');
    const [nextPayment, setNextPayment] = useState('');
    const [loadPayment, setLoadPayment] = useState(false);
    const [loadNextPayment, setLoadNextPayment] = useState(false);

    useEffect(() => {
        async function fetchPayments(){
            const db = getFirestore();
            const paymentsCollectionRef = collection(db, 'payments');
            const q = query(paymentsCollectionRef, where('allocationId', '==', cripto.allocationId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const paymentDoc = querySnapshot.docs[0];
                const paymentData = paymentDoc.data();
                setPayment(paymentData.payment);
            }
        };
        fetchPayments();
    },[]);

    useEffect(() => {
        async function fetchNextPayments(){
            const db = getFirestore();
            const nextPaymentsCollectionRef = collection(db, 'nextpayments');
            const q = query(nextPaymentsCollectionRef, where('allocationId', '==', cripto.allocationId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const nextPaymentDoc = querySnapshot.docs[0];
                const nextPaymentData = nextPaymentDoc.data();
                setNextPayment(nextPaymentData.nextPayment);
            }
        };
        fetchNextPayments();
    },[]);

    async function handlePaymentAmount(id: string){
        if(!payment){
            alert('Insira a quantidade de parcelas.');
            return;
        };
        setLoadPayment(true);
        const db = getFirestore();
        
        const paymentsCollectionRef = collection(db, 'payments');
        const q = query(paymentsCollectionRef, where('allocationId', '==', id));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
            // Update existing payment document
            const paymentDoc = querySnapshot.docs[0];
            const paymentDocRef = doc(db, 'payments', paymentDoc.id);
            try {
                await updateDoc(paymentDocRef, { payment });
            } catch (error) {
                console.log(error);
            }
        } else {

            // Add new payment document
            const paymentData = {
                payment,
                allocationId: id
            };
            
            try {
                await addDoc(paymentsCollectionRef, paymentData);
            } catch (error) {
                console.log(error);
            }
        }
    
        setLoadPayment(false);
    };
    
    async function handleNextPayment(id: string){
        if(!nextPayment){
            alert('Insira o próximo mês.');
            return;
        };
        setLoadNextPayment(true);
        const db = getFirestore();
    
        const nextPaymentsCollectionRef = collection(db, 'nextpayments');
        const q = query(nextPaymentsCollectionRef, where('allocationId', '==', id));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
            // Update existing next payment document
            const nextPaymentDoc = querySnapshot.docs[0];
            const nextPaymentDocRef = doc(db, 'nextpayments', nextPaymentDoc.id);
            try {
                await updateDoc(nextPaymentDocRef, { nextPayment });
            } catch (error) {
                console.log(error);
            }
        } else {

            // Add new next payment document
            const nextPaymentData  = {
                nextPayment,
                allocationId: id
            };
            
            try {
                await addDoc(nextPaymentsCollectionRef, nextPaymentData);
            } catch (error) {
                console.log(error);
            }
        };
        setLoadNextPayment(false);
    };
    
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                // em qualquer lugar na tela do ScrollView que clicar irá fechar o teclado, no android já é padrão
                // mas coloca para garantir que no IOS feche tbm
                onPress={() => Keyboard.dismiss()}
            >

                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: RFValue(80),
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.viewImage}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.buttonBack}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon icon='arrow-left' color={COLORS.BLACK} />
                        </TouchableOpacity>

                        {cripto.image ? (
                            <Image
                                resizeMode='cover'
                                style={styles.image}
                                src={cripto.image}
                            />
                        ) : (
                            <Text
                                style={{
                                    color: COLORS.BLACK, 
                                    fontSize: RFValue(14), 
                                    fontWeight: 'bold', 
                                    fontFamily: FONTS.TEXT,
                                    opacity: 0.5
                                }}
                            > sem imagem </Text>
                        )}
                        

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.buttonGoEdit}
                            onPress={() => navigation.navigate('register', {cripto} )}
                        >
                            <Icon icon='edit-2' color={COLORS.BLACK} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.content}>
                        <Text style={styles.date}> {cripto.date} </Text>
                        <Text style={styles.name}> {cripto.name} </Text>
                        <Text style={styles.description}> {cripto.description} </Text>
                        
                        <View style={styles.viewDetails}>
                            <View style={styles.boxDetails}>
                                <Text style={styles.titleBoxDetails}> investimento </Text>
                                <Text style={styles.subTitleBoxDetails}> $ {cripto.investment} </Text>
                            </View>
                            <View style={styles.boxDetails}>
                                <Text style={styles.titleBoxDetails}> token </Text>
                                <Text style={styles.subTitleBoxDetails}> $ {cripto.price} </Text>
                            </View>
                            <View style={styles.boxDetails}>
                                <Text style={styles.titleBoxDetails}> taxa? </Text>
                                <Text style={styles.subTitleBoxDetails}> $ {cripto.taxa} </Text>
                            </View>
                        </View>

                        <View style={styles.viewDetailsTgeAndCliff}>
                            <View style={styles.boxDetails}>
                                <Text style={styles.titleBoxDetails}> TGE </Text>
                                <Text style={styles.subTitleBoxDetails}> {cripto.tge}% </Text>
                            </View>
                            <View style={styles.boxDetails}>
                                <Text style={styles.titleBoxDetails}> cliff </Text>
                                <Text style={styles.subTitleBoxDetails}> {cripto.cliff} meses </Text>
                            </View>
                        </View>

                        <View style={styles.viewDetails2items}>
                            <View style={[
                                styles.boxDetails,
                                {flex: 1}
                            ]}>
                                <Text style={styles.titleBoxDetails}> vesting </Text>
                                <Text style={styles.subTitleBoxDetails}> {cripto.vesting} </Text>
                            </View>

                            <View style={[
                                styles.boxDetails,
                                {flex: 1}
                            ]}>
                                <Text style={styles.titleBoxDetails}> Prev lançamento </Text>
                                <Text style={styles.subTitleBoxDetails}> {cripto.launch} </Text>
                            </View>
                        </View>

                    </View>


                    <View style={[
                        styles.footer,
                        {marginBottom: RFValue(10)}
                    ]}>
                        <Text style={styles.titleInput}> qtd parcelas:  </Text>
                        <View style={styles.viewInput}>
                            
                            <TextInput 
                                style={styles.input}
                                placeholder='0'
                                autoCorrect={false}
                                placeholderTextColor='#999999'
                                keyboardType='numeric'
                                value={payment}
                                onChangeText={setPayment}
                            />
                            
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.buttonInput}
                                onPress={() => handlePaymentAmount(cripto.allocationId)}
                            >
                                {loadPayment ? (
                                    <ActivityIndicator size={RFValue(20)} color={COLORS.BLACK} />
                                ) : (
                                    <Icon
                                        icon='save'
                                        color={COLORS.BLACK}
                                    />
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.titleInput}> próximo Pgto:  </Text>
                        <View style={styles.viewInput}>
                            
                            <TextInput 
                                style={styles.input}
                                placeholder='Maio'
                                autoCorrect={false}
                                placeholderTextColor='#999999'
                                value={nextPayment}
                                onChangeText={setNextPayment}
                            />
                            
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.buttonInput}
                                onPress={() => handleNextPayment(cripto.allocationId)}
                            >
                                {loadNextPayment ? (
                                    <ActivityIndicator size={RFValue(20)} color={COLORS.BLACK} />
                                ) : (
                                    <Icon
                                        icon='save'
                                        color={COLORS.BLACK}
                                    />
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>

                </ScrollView>

            </TouchableWithoutFeedback>
        </View>
    )
}