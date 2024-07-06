import {
    View, 
    Text, 
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {styles} from './styles';

import { RFValue } from 'react-native-responsive-fontsize';

import {Header} from '@components/Header';
import {CardInvestment} from '@components/CardInvestment';
import {CardItemHome} from '@components/CardItemHome';
import { Icon } from '@src/components/Icon';
import { COLORS } from '@src/theme';
import {useNavigation} from '@react-navigation/native';

export function Home(){
    const navigation = useNavigation();

    const items = [
        {
            id: '1',
            image: 'https://pbs.twimg.com/profile_images/1747564240763056128/QPfeZbcI_400x400.jpg',
            name: 'Tabi',
            description: 'Tabi é uma cadeia modular de jogos de hiperdesempenho com uma camada de execução omni. Construído no Cosmos SDK e com compatibilidade total com EVM, Tabi introduz o consenso ParallelBFT enquanto permite que jogos implantados personalizem seu próprio mecanismo de consenso e ambiente de execução, e até mesmo aproveitem a segurança compartilhada via EigenLayer ou Babylon, se desejarem.',
            investment: '375',
            price: '0.09',
            taxa: '0',
            tge: 20,
            cliff: 0,
            vesting: 'Linear de 12 meses',
            launch: 'Final de Julho',
            date: '07/2024'
        },
        {
            id: '2',
            image: 'https://pbs.twimg.com/profile_images/1749776263521222658/ssb4WD3a_400x400.jpg',
            name: 'Beraborrow',
            description: 'Beraborrow é um protocolo descentralizado na vanguarda do ecossistema Berachain baseado no conhecido modelo Liquity no Ethereum. Beraborrow permite que os usuários contraiam empréstimos sem juros usando o token iBGT como garantia. O objetivo final do Beraborrow é desbloquear mais liquidez no ecossistema Berachain.',
            investment: '15.650',
            price: '0.050',
            taxa: '1.565',
            tge: 20,
            cliff: 2,
            vesting: '8 meses dE forma Linear',
            launch: 'previsão para lançamento será para o final de Agosto',
            date: '07/2024'
        },
        {
            id: '3',
            image: 'https://pbs.twimg.com/profile_images/1731622659257978880/cZHEk6GN_400x400.jpg',
            name: 'Hybrid',
            description: 'HYBRID é um blockchain compatível com EVM de camada 1 com camadas de dados dedicadas à IA para alimentar grandes modelos de linguagem, incluindo Atlas. Atlas, o primeiro LLM da plataforma, simplifica análises baseadas em IA, aprimorando as interações do usuário com dados de blockchain para análises mais eficientes.',
            investment: '65',
            price: '0.035',
            taxa: '10',
            tge: 20,
            cliff: 2,
            vesting: 'Linear de 8 meses',
            launch: 'Final de Julho',
            date: '07/2024'
        },
        {
            id: '4',
            image: 'https://pbs.twimg.com/profile_images/1777566935909380096/0o7YcuS__400x400.jpg',
            name: 'Raiinmaker',
            description: 'Raiinmaker é uma empresa de tecnologia Web3 e AI que desenvolveu o aplicativo Raiinmaker DePIN AI e o protocolo Coiin DePIN.',
            investment: '200',
            price: '0.70',
            taxa: '0',
            tge: 25,
            cliff: 0,
            vesting: 'Linear de 8 meses',
            launch: 'Final de Julho',
            date: '07/2024'
        },
        {
            id: '5',
            image: 'https://pbs.twimg.com/profile_images/1774932612160557056/QOyzwbO2_400x400.jpg',
            name: 'Camp Network',
            description: 'Camp Network é uma camada de dados componível para o futuro do social crypto. Eles são uma L2 modular lançada na OP Superchain, visando especificamente dapps focados em consumidores nos espaços de entretenimento, mídia, música e jogos. Seu ecossistema já possui mais de 50 parceiros (10+ nativos/exclusivos) em testnet, e estão trabalhando com conglomerados de mídia de primeira linha em todas as geografias (incluindo Three Six Zero, Palm Artists, WME, Nox Media e Content Technologies/Beyond Music).',
            investment: '10.570',
            price: '0.0050',
            taxa: '1.057',
            tge: 10,
            cliff: 3,
            vesting: 'Recebendo por 12 meses',
            launch: 'previsão para lançar em outuBro',
            date: '07/2024'
        },
    ];

    return (
        <View style={styles.container}>
            <Header/>
            <CardInvestment/>
            
            <Text style={styles.title}> alocações </Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: RFValue(200)
                }}
            >
                {items.map((item) => (
                    <CardItemHome
                        key={item.id}
                        data={item}
                    />
                ))}
            </ScrollView>

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