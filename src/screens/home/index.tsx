import {useState, useEffect, useCallback  } from 'react';
import {
    View, 
    Text, 
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';

import {styles} from './styles';

import {Header} from '@components/Header';
import {CardInvestment} from '@components/CardInvestment';
import {CardItemHome} from '@components/CardItemHome';
import { Icon } from '@src/components/Icon';

import { COLORS, FONTS } from '@src/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect, RouteProp} from '@react-navigation/native';

import {useAuth} from '@hooks/auth';
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
    orderBy
} from 'firebase/firestore';

import {CriptoDTO} from '../../dtos/CriptoDTO';

export function Home(){
    const navigation = useNavigation();
    const {signOutUser, user} = useAuth();

    const [allocations, setAllocations] = useState<CriptoDTO[]>([]);
    const [load, setLoad] = useState(true);

    async function loadAllocations(){
        if(!user){
            return;
        };

        try {
            const firestore = getFirestore();
            const userAllocationCollectionRef = collection(firestore, 'allocations');
            
            const q = query(
                userAllocationCollectionRef, where('userId', '==', user.id),
                // orderBy('createdAllocation') -> para usar o orderBy precisa criar um Índice no Firebase
            );

            const querySnapshot = await getDocs(q);

            const loadAllocations: CriptoDTO[] = [];
            querySnapshot.forEach((doc) => {
                // tinha o Erro de conversão de Tipo.
                // Resolução: converter o objeto para unknown primeiro e depois para CriptoDTO.
                loadAllocations.push({ allocationId: doc.id, ...doc.data() } as unknown as CriptoDTO);
            });

            setAllocations(loadAllocations);
            setLoad(false);

        } catch (error) {
            console.log(error);
        };
    };
    
    useEffect(() => {
        loadAllocations();
    }, [allocations]);
    
    return (
        <View style={styles.container}>
            <Header/>
            <CardInvestment/>
            
            {load ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={RFValue(30)} color={COLORS.BLACK} />
                </View>
            ) : (
                
                <FlatList
                    data={allocations}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.uniqueKeyAllocation}
                    contentContainerStyle={{
                        paddingBottom: RFValue(200)
                    }}

                    ListHeaderComponent={
                        <View style={styles.headerScrollView}>
                            <TouchableOpacity
                                onPress={signOutUser}
                                style={styles.buttonLogout}
                            >
                                <Icon
                                    icon='log-out'
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>
                
                            <Text style={styles.title}> alocações </Text>
                        </View>
                    }

                    ListEmptyComponent={
                        <Text
                            style={{fontSize: RFValue(14), color: COLORS.BLACK, opacity: 0.5,
                                fontWeight: 'bold', fontFamily: FONTS.TEXT, textAlign: 'center',
                                marginTop: RFValue(40)
                            }}
                            > cadastre sua primeira alocação 
                        </Text>
                    }

                    renderItem={({ item }) => (
                        <CardItemHome
                            data={item}
                        />
                    )}
                />

            )}

            <TouchableOpacity
                style={styles.buttonRegister}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('register', {} )}
            >
                <Icon
                    icon='plus'
                    color={COLORS.WHITE_800}
                />
            </TouchableOpacity>

        </View>
    )
}