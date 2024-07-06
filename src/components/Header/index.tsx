import {
    View, 
    Text, 
    Image
} from 'react-native';

import {styles} from './styles';

import Logo from '@assets/logo.png';

export function Header(){

    function getGreeting(){
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            return 'Bom dia!';
        } else if (currentHour < 18){
            return 'Boa tarde!';
        } else {
            return 'Boa noite!';
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.title}> Olá, {getGreeting()} </Text>
                <Text style={styles.subtitle}> seja bem vindo </Text>
            </View>

            <Image source={Logo} style={styles.logo} />

        </View>
    )
}