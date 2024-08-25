import {useState} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    ActivityIndicator
} from 'react-native';

import {styles} from './styles';

import {CriptoDTO} from '../../dtos/CriptoDTO';
import { RFValue } from 'react-native-responsive-fontsize';

import {useNavigation, useRoute} from '@react-navigation/native';
import { COLORS } from '@src/theme';
import {MessageNewAllocation, MessageEditAllocation} from '@utils/MessageToast';
import {formatCurrencyMaskInput} from '@utils/Formatted';

import {Icon} from '@components/Icon';
import {Header} from '@components/Header';
import {Input} from '@components/Input';

import {
    collection,
    getFirestore,
    addDoc,
    Timestamp,
    doc,
    updateDoc
} from 'firebase/firestore';

import {useAuth} from '@hooks/auth';

interface RouteParams {
    cripto?: CriptoDTO;
};

export function Register(){
    const navigation = useNavigation();

    const {user} = useAuth();
    const route = useRoute();
    const {cripto} = route.params as RouteParams;
    
    const [load, setLoad] = useState(false);
    const [image, setImage] = useState(cripto?.image || '');
    const [name, setName] = useState(cripto?.name || '');
    const [description, setDescription] = useState(cripto?.description || '');
    const [investment, setInvestment] = useState(cripto?.investment?.toString() || '');
    const [price, setPrice] = useState(cripto?.price?.toString() || '');
    const [taxa, setTaxa] = useState(cripto?.taxa?.toString() || '');
    const [tge, setTge] = useState(cripto?.tge?.toString() || '');
    const [cliff, setCliff] = useState(cripto?.cliff?.toString() || '');
    const [vesting, setVesting] = useState(cripto?.vesting || '');
    const [launch, setLaunch] = useState(cripto?.launch || '');

    const handleTextChange = (text : string) => {
        const cleanedValue = text.replace(/[^\d]/g, '');
        setInvestment(cleanedValue);
    };

    async function handleRegister(){
        /* 
        OBS: NAO PRECISO PASSAR UM ID POIS SERA CRIADO DE FORMA AUTOMATICA NO FIREBASE, PARA ACESSAR ESSE ID É SÓ
        CHAMAR ELE (ID), QUE O FIREBASE IRÁ ENTENDER QUE QUERO O ID DO ITEM CRIADO, PARA NAO DAR ERRO NO TYPESCRIPT
        EU COLOQUEI O ID: STRING, PARA PODER USAR.
        */
        if(!name || !description || !investment || !price || !tge || !cliff || !vesting || !launch){
            alert('Preencha os campos!');
            return;
        };

        const db = getFirestore();
        
        const nowDate = new Date();
        const month = String(nowDate.getMonth() + 1).padStart(2, '0'); // coloca um 0 a esquerda
        const year = nowDate.getFullYear();

        if(!user?.id){
            alert('sem id do user')
            return;
        };

        setLoad(true);

        // Atualizando Uma Alocação
        if(cripto?.allocationId){
            try {
                const updatedAllocationData = {
                    image,
                    name,
                    description,
                    investment: formatCurrencyMaskInput(investment),
                    price,
                    taxa,
                    tge: (parseFloat(tge)),
                    cliff: (parseFloat(cliff)),
                    vesting,
                    launch,
                    userId: user?.id,
                    uniqueKeyAllocation: `${name}/${Date.now()}`,
                };
                const allocationRef = doc(db, 'allocations', cripto.allocationId);
                await updateDoc(allocationRef, updatedAllocationData);
                MessageEditAllocation();
                navigation.navigate('home');
                setLoad(false);
                
                return;

            } catch (error) {
                console.log(error);
                setLoad(false);
                return;
            }
        };

        const allocationData = {
            image,
            name,
            description,
            investment: formatCurrencyMaskInput(investment),
            price,
            taxa,
            tge: (parseFloat(tge)),
            cliff: (parseFloat(cliff)),
            vesting,
            launch,
            userId: user?.id,
            date: `${month}/${year}`,
            uniqueKeyAllocation: `${name}/${Date.now()}`,
            createdAllocation: Timestamp.now(), // Timestamp do Firebase, ideia para usar o orderBy na tela Home
        };

        try {
            // Add a new allocation document
            const allocationsCollectionRef = collection(db, 'allocations');
            await addDoc(allocationsCollectionRef, allocationData);

            MessageNewAllocation();
            navigation.goBack();
            
            setLoad(false);

        } catch (error) {
            console.log(error);
            setLoad(false);
        }
    };

    return (
        <View style={styles.container}>

            <Header/>

            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: RFValue(150),
                    }}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.headerNavigation}>
                        <TouchableOpacity
                            style={styles.buttonGoBack}
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon
                                icon='arrow-left'
                                color={COLORS.BLACK}
                            />
                        </TouchableOpacity>
                        <Text style={styles.titleHeaderNavigation}> {cripto?.uniqueKeyAllocation ? 'editar' : 'nova'} alocação </Text>
                    </View>

                    <View style={styles.viewInputs2items}>
                        <Text style={styles.titleViewInputs}> Logo </Text>
                        <Input
                            type='large'
                            placeholder='URL da imagem aqui (não obrigatório)'
                            placeholderTextColor='#999999'
                            
                            value={image}
                            onChangeText={setImage}
                        />
                    </View>

                    <View style={styles.viewInputs2items}>
                        <Text style={styles.titleViewInputs}> Nome </Text>
                        <Input
                            type='large'
                            placeholder='Nome Projeto'
                            placeholderTextColor='#999999'

                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.viewInputs2items}>
                        <Text style={[styles.titleViewInputs]}> Sobre </Text>
                        <TextInput
                            style={[
                                styles.inputDescription,
                                {textAlignVertical: 'top'}
                            ]}
                            placeholder='Sobre o projeto'
                            placeholderTextColor='#999999'
                            multiline

                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View style={styles.viewInputs3items}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={styles.titleViewInputs}> investimento </Text>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.subTitleViewInputs3items}> $ </Text>

                                <Input
                                    type='small'
                                    placeholder='200'
                                    placeholderTextColor='#999999'
                                    keyboardType='numeric'

                                    value={formatCurrencyMaskInput(investment)}
                                    onChangeText={handleTextChange}
                                />
                            </View>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={styles.titleViewInputs}> token </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.subTitleViewInputs3items}> $ </Text>
                                <Input
                                    type='small'
                                    placeholder='0.05'
                                    placeholderTextColor='#999999'
                                    keyboardType='numeric'

                                    value={price}
                                    onChangeText={setPrice}
                                />
                            </View>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={styles.titleViewInputs}> taxa? </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.subTitleViewInputs3items}> $ </Text>
                                <Input
                                    type='small'
                                    placeholder='20'
                                    placeholderTextColor='#999999'
                                    keyboardType='numeric'

                                    value={taxa}
                                    onChangeText={setTaxa}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[
                        styles.viewInputs3items,
                        {justifyContent: 'space-around', marginTop: RFValue(10)}
                    ]}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={styles.titleViewInputs}> tge </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Input
                                    type='small'
                                    placeholder='20'
                                    placeholderTextColor='#999999'
                                    keyboardType='numeric'

                                    value={tge}
                                    onChangeText={setTge}
                                />
                                <Text style={styles.subTitleViewInputs3items}> % </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={styles.titleViewInputs}> cliff </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Input
                                    type='small'
                                    placeholder='3'
                                    placeholderTextColor='#999999'
                                    keyboardType='numeric'

                                    value={cliff}
                                    onChangeText={setCliff}
                                />
                                <Text style={[
                                    styles.subTitleViewInputs3items,
                                    {fontSize: RFValue(12)}
                                ]}> Meses </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.viewInputs2items}>

                        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text style={styles.titleViewInputs}> vesting </Text>
                            <Input
                                type='large'
                                placeholder='Linear De 6 Meses'
                                placeholderTextColor='#999999'

                                value={vesting}
                                onChangeText={setVesting}
                            />
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text style={styles.titleViewInputs}> prev lançamento </Text>
                            <Input
                                type='large'
                                placeholder='Final De Agosto'
                                placeholderTextColor='#999999'

                                value={launch}
                                onChangeText={setLaunch}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonRegister}
                        activeOpacity={0.8}
                        onPress={handleRegister}
                    >
                        {load ? (
                            <ActivityIndicator
                                color={COLORS.WHITE_800}
                                size={RFValue(20)}
                            />
                        ) : (

                            <Icon
                                icon='plus'
                                color={COLORS.WHITE_800}
                            />
                        )}
                    </TouchableOpacity>

                </ScrollView>

            </TouchableWithoutFeedback>
            
        </View>

    );
}