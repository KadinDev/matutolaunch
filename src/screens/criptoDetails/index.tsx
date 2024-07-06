import {
    View, 
    Text, 
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import {styles} from './styles';
import {useRoute} from '@react-navigation/native';
import {CriptoDTO} from '../../dtos/CriptoDTO';
import { RFValue } from 'react-native-responsive-fontsize';
import {Icon} from '@components/Icon';
import { COLORS, FONTS } from '@src/theme';
import {useNavigation} from '@react-navigation/native';

interface RouteParams {
    cripto: CriptoDTO;
};

export function CriptoDetails(){

    const route = useRoute();
    const {cripto} = route.params as RouteParams;
    const navigation = useNavigation();

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
                                placeholder='7'
                                autoCorrect={false}
                                placeholderTextColor='#999999'
                                keyboardType='numeric'
                            />
                            
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.buttonInput}
                                onPress={() => alert('salvar')}
                            >
                                <Icon
                                    icon='save'
                                    color={COLORS.BLACK}
                                />
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
                            />
                            
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.buttonInput}
                                onPress={() => alert('salvar')}
                            >
                                <Icon
                                    icon='save'
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                </ScrollView>

            </TouchableWithoutFeedback>
        </View>
    )
}