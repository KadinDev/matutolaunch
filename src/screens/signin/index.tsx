import { useState } from 'react';

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
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '@src/theme';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/logo.png';

import {Icon} from '@components/Icon';
import {Input} from '@components/Input';

export function SignIn(){
    const [showPass, setShowPass] = useState(true);
    const [showRecoverPass, setShowRecoverPass] = useState(false);

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
                            <Input
                                type='large'
                                placeholder='Email'
                                keyboardType='email-address'
                            />
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                activeOpacity={0.8}
                                onPress={() => alert('Email enviado!')}
                            >
                                <Icon
                                    icon='send'
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>
                        </View>   
                    
                    ) : (
                        <View style={styles.viewInput}>
                            <Input
                                type='large'
                                placeholder='Email'
                                keyboardType='email-address'
                            />

                            <View style={styles.viewInputPass}>
                                <Input
                                    type='large'
                                    placeholder='Senha'
                                    secureTextEntry={showPass}
                                />
                                <TouchableOpacity
                                    style={styles.buttonIcon}
                                    activeOpacity={0.8}
                                    onPress={(() => setShowPass(!showPass))}
                                >
                                    <Icon
                                        icon={showPass ? 'eye-off' : 'eye'}
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
                        onPress={(() => alert('login'))}
                    >
                        <Icon
                            icon='log-in'
                            color={COLORS.BLACK}
                        />
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