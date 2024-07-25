import {useEffect, useState} from 'react';

import {
    View, 
    Text, 
    Image
} from 'react-native';

import {styles} from './styles';

import Logo from '@assets/logo.png';
import {useAuth} from '@hooks/auth';

export function Header(){
    const {user} = useAuth();
    
    function getGreeting(){
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            return 'Bom dia';
        } else if (currentHour < 18){
            return 'Boa tarde';
        } else {
            return 'Boa noite';
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.subtitle}> {getGreeting()} </Text>
                <Text style={styles.title}> {user?.name} </Text>
            </View>

            <Image source={Logo} style={styles.logo} />

        </View>
    )
}