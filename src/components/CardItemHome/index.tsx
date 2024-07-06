import {useState} from 'react';

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

interface Props {
    data: CriptoDTO;
};

export function CardItemHome({data} : Props){

    const navigation = useNavigation();

    function messageDeleteProject(item : CriptoDTO){
        Alert.alert(
            `${item.name}`,
            'Ao deletar esse projeto você confirma que foi finalizado e recebeste todo o pagamento dos tokens!',
            [
                { 
                    text: "Sim", 
                    onPress: () => handleDeleteConfirmProject(item.id) 
                },
                {
                    text: "Não",
                    onPress: () => alert('Cancelado'),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    function handleDeleteConfirmProject(item : string){
        alert(`deletando ${item}`)
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
                        opacity: 0.5
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