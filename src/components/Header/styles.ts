import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: RFValue(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + RFValue(20),
    },
    left: {
        flexDirection: 'column',
    },
    title: {
        fontSize: RFValue(18),
        fontFamily: FONTS.TEXT,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    subtitle: {
        fontSize: RFValue(14),
        lineHeight: RFValue(16),
        fontFamily: FONTS.TITLE,
        color: COLORS.BLACK,
        textTransform: 'capitalize',
        textAlign: 'left'
    },
    logo: {
        width: RFValue(100),
        height: RFValue(170),
        marginRight: RFValue(-1)
    }
})