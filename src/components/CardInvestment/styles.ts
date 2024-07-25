import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: RFValue(120),
        backgroundColor: COLORS.WHITE_100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: RFValue(15),
        borderRadius: 10,
        elevation: 2,
        position: 'relative'
    },
    wallet: {
        width: RFValue(100),
        height: RFValue(80),
    },
    details: {
        marginRight: RFValue(10),
    },
    title: {
        fontSize: RFValue(12),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: RFValue(10),
        textTransform: 'capitalize'
    },
    subtitle: {
        fontSize: RFValue(25),
        lineHeight: RFValue(25),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        textAlign: 'right',
    }
})