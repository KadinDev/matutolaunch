import {useState} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import {styles} from './styles';

import {CriptoDTO} from '../../dtos/CriptoDTO';
import { RFValue } from 'react-native-responsive-fontsize';

import {useNavigation, useRoute} from '@react-navigation/native';
import { COLORS, FONTS } from '@src/theme';

import {Icon} from '@components/Icon';
import {Header} from '@components/Header';
import {Input} from '@components/Input';


interface RouteParams {
    cripto?: CriptoDTO;
};

export function Register(){
    const navigation = useNavigation();

    const route = useRoute();
    const {cripto} = route.params as RouteParams;
    
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

    function handleRegister(){
        alert('Registrar');
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
                        <Text style={styles.titleHeaderNavigation}> {cripto?.id ? 'editar' : 'nova'} alocação </Text>
                    </View>

                    <View style={styles.viewInputs2items}>
                        <Text style={styles.titleViewInputs}> Logo </Text>
                        <Input
                            type='large'
                            placeholder='Cole a URL da imagem aqui'
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

                                    value={investment}
                                    onChangeText={setInvestment}
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
                        <Icon
                            icon='plus'
                            color={COLORS.WHITE_800}
                        />
                    </TouchableOpacity>

                </ScrollView>

            </TouchableWithoutFeedback>
            
        </View>

    );
}