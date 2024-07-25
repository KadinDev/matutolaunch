
import {
    View, 
    Text, 
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import {styles} from './styles';

import {CriptoDTO} from '../../dtos/CriptoDTO';
import { RFValue } from 'react-native-responsive-fontsize';

import {useNavigation} from '@react-navigation/native';
import {Icon} from '@components/Icon';
import { COLORS, FONTS } from '@src/theme';
import {MessageDeleteAllocation} from '@utils/MessageToast';

interface Props {
    data: CriptoDTO;
};

import {
    doc,
    getFirestore,
    deleteDoc
} from 'firebase/firestore';

export function CardItemHome({data} : Props){

    const navigation = useNavigation();
    const firestore = getFirestore();

    function messageDeleteProject(item : CriptoDTO){
        /* ATENÇÃO: No firebase automaticamente cada ALOCAÇÃO salva recebe um ID.
        Para a função DELETAR funcionar corretamente você não deve passar um ID na tipagem(CriptoDTO),
        senão o Firebase vai entender que será o ID automatico que criou e não dará certo.
        Por isso criei na Tipagem o allocationId. (ACHO QUE O FIREBASE VAI
        INTERPRETAR COMO O ID GERADO DE FORMA AUTOMATICA)*/
        // TEMTAR UTIIZANDO OUTRA INFO (Nome, uniqueKeyAllocation)
        Alert.alert(
            `${item.name}`,
            'Ao deletar esse projeto você confirma que foi finalizado e recebeste todo o pagamento dos tokens!',
            [
                { 
                    text: "Sim", 
                    onPress: () => handleDeleteConfirmProject(item.allocationId) 
                },
                {
                    text: "Não",
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    async function handleDeleteConfirmProject(id : string){
        try {
            const allocationDocRef = doc(firestore, 'allocations', id);
            await deleteDoc(allocationDocRef);

            MessageDeleteAllocation();

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <View style={styles.container}>

            {data.image ? (
                <Image
                    resizeMode='cover'
                    style={styles.Image}
                    src={data.image}
                />
            ) : (
                <Text
                    style={{
                        color: COLORS.BLACK, 
                        fontSize: RFValue(12), 
                        fontWeight: 'bold', 
                        fontFamily: FONTS.TEXT,
                        opacity: 0.5,
                        width: RFValue(80)
                    }}
                > sem imagem </Text>
            )}

            <View style={styles.ViewInfo}>
                <Text style={styles.Name}> {data.name} </Text>
                <Text style={styles.Description} numberOfLines={2}> {data.description} </Text>
                <Text style={styles.Date}> entrada em: {data.date} </Text>
            </View>

            <TouchableOpacity
                style={styles.ButtonDelete}
                onPress={() => messageDeleteProject(data)}
            >
                <View
                    style={{marginLeft: RFValue(8)}}
                >
                    <Icon
                        icon='x'
                        color={COLORS.WHITE_800}
                    />
                </View>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.ButtonNavigate}
                onPress={() => navigation.navigate('criptoDetails', {cripto: data})}
            >
                <View
                    style={{marginLeft: RFValue(8)}}
                >
                    <Icon
                        icon='arrow-right'
                        color={COLORS.WHITE_800}
                    />
                </View>

            </TouchableOpacity>
        </View>

    );
}