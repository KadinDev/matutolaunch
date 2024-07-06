import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    input: {
        height: RFValue(40),
        backgroundColor: COLORS.WHITE_100,
        borderRadius: RFValue(5),
        paddingHorizontal: RFValue(10),
        fontSize: RFValue(14),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        textAlign: 'left'
    },
    smallInput: {
        width: RFValue(70),
        textAlign: 'center'
    },
    mediumInput: {
        width: '50%',
        textAlign: 'left'
    },
    largeInput: {
        width: '100%',
        textAlign: 'left'
    },
})