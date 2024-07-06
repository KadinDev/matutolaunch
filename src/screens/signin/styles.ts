import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_800,
        paddingHorizontal: RFValue(40),
    },
    logo: {
        width: RFValue(200),
        height: RFValue(200),
        borderRadius: RFValue(150),
        marginBottom: RFValue(-20)
    },
    viewInput: {
        width: '100%',
    },
    viewInputPass: {
        width: '100%',
        position: 'relative',
        marginTop: RFValue(10),
    },
    buttonIcon: {
        position: 'absolute',
        right: RFValue(0),
        top: '10%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        width: RFValue(40),
        borderLeftWidth: 1
    },
    login: {
        marginTop: RFValue(20),
    },
    text: {
        fontSize: RFValue(12),
        color: COLORS.BLACK,
        fontFamily: FONTS.TEXT,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: RFValue(40),
        opacity: 0.7
    }
})