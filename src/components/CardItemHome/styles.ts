import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: RFValue(80),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: RFValue(20),
        position: 'relative',
        backgroundColor: COLORS.WHITE_100
    },
    Image: {
        width: RFValue(80),
        height: RFValue(80)
    },
    ViewInfo: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingLeft: RFValue(10)
    },
    Name: {
        color: COLORS.BLACK,
        fontSize: RFValue(14),
        fontWeight: 'bold',
        fontFamily: FONTS.TEXT
    },
    Description: {
        color: COLORS.BLACK,
        fontSize: RFValue(12),
        lineHeight: RFValue(14),
        fontFamily: FONTS.TEXT,
        textAlign: 'left',
        marginRight: RFValue(100),
    },
    Date: {
        color: COLORS.BLACK,
        opacity: 0.7,
        fontFamily: FONTS.TEXT,
        fontWeight: 'bold',
        fontSize: RFValue(10),
        lineHeight: RFValue(14)
    },
    ButtonNavigate: {
        width: RFValue(35),
        height: RFValue(30),
        backgroundColor: COLORS.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: RFValue(0),
        right: RFValue(0),
        borderTopLeftRadius: RFValue(30)
    },
    ButtonDelete: {
        width: RFValue(35),
        height: RFValue(30),
        backgroundColor: COLORS.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: RFValue(0),
        right: RFValue(0),
        borderBottomLeftRadius: RFValue(30)
    }
})