import { useState } from 'react';

import {
    View, 
    Text, 
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {styles} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '@src/theme';
import Logo from '../../assets/logo.png';

import {Icon} from '@components/Icon';
import {Input} from '@components/Input';

import {useAuth} from '@hooks/auth';

export function SignIn(){
    const [showPass, setShowPass] = useState(true);
    const [showRecoverPass, setShowRecoverPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recoverPass, setRecoverPass] = useState('');

    const {signIn, forgotPassword, load} = useAuth();

    function handleLogin(){
        signIn(email, password);
    };

    function handleForgotPassword(){
        forgotPassword(recoverPass);

        if(!recoverPass){
            return
        } else {
            setShowRecoverPass(false);
            setRecoverPass('');
        };
    };

    return(
        <View style={styles.container}>

            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >

                <Image
                    source={Logo}
                    style={styles.logo}
                />
            
                {
                    showRecoverPass ?
                    (
                        <View style={styles.viewInput}>
                            <View style={{
                                width: RFValue(230),
                            }}>
                                <Input
                                    type='large'
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    value={recoverPass}
                                    onChangeText={setRecoverPass}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                activeOpacity={0.8}
                                onPress={handleForgotPassword}
                            >
                                { load ? (
                                    <ActivityIndicator
                                        size={RFValue(20)}
                                        color={COLORS.BLACK}
                                    />
                                ) : (
                                    <Icon
                                        icon='send'
                                        color={COLORS.BLACK}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>   
                    
                    ) : (
                        <View style={styles.viewInput}>
                            <Input
                                type='large'
                                placeholder='Email'
                                keyboardType='email-address'
                                value={email}
                                onChangeText={setEmail}
                            />

                            <View style={styles.viewInputPass}>
                                <Input
                                    type='large'
                                    placeholder='Senha'
                                    secureTextEntry={showPass}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={styles.buttonIcon}
                                    activeOpacity={0.8}
                                    onPress={(() => setShowPass(!showPass))}
                                >
                                    <Icon
                                        icon={showPass ? 'eye' : 'eye-off'}
                                        color={COLORS.BLACK}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                {!showRecoverPass &&
                    <TouchableOpacity
                        style={styles.login}
                        activeOpacity={0.8}
                        onPress={handleLogin}
                    >
                        { load ? (
                            <ActivityIndicator
                                size={RFValue(20)}
                                color={COLORS.BLACK}
                            />
                        ) : (
                            <Icon
                                icon='log-in'
                                color={COLORS.BLACK}
                            />
                        )}
                        
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={(() => setShowRecoverPass(!showRecoverPass))}
                >
                    <Text style={styles.text}>
                        {showRecoverPass ? 'login' : 'esqueci a senha'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}