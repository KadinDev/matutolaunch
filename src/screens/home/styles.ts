import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_800,
        paddingHorizontal: RFValue(20),
        position: 'relative'
    },
    title: {
        fontSize: RFValue(14),
        color: COLORS.BLACK,
        fontFamily: FONTS.TEXT,
        fontWeight: 'bold',
        marginVertical: RFValue(15),
        textAlign: 'right',
        textTransform: 'capitalize'
    },
    buttonRegister: {
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(30),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: getBottomSpace() + RFValue(20),
        right: '50%',
        backgroundColor: COLORS.BLACK,
    }
})