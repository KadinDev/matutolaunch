import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_800,
        paddingHorizontal: RFValue(20),
    },
    headerNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: RFValue(20),
    },
    buttonGoBack: {
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(20),
        backgroundColor: COLORS.WHITE_100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleHeaderNavigation: {
        fontSize: RFValue(12),
        color: COLORS.BLACK,
        fontFamily: FONTS.TEXT,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    viewInputs2items: {
        flexDirection: 'column',
    },
    titleViewInputs: {
        textTransform: 'uppercase',
        fontFamily: FONTS.TEXT,
        fontSize: RFValue(12),
        fontWeight: 'bold',
        marginBottom: RFValue(5),
        marginTop: RFValue(15),
    },
    inputDescription: {
        height: RFValue(120),
        backgroundColor: COLORS.WHITE_100,
        borderRadius: RFValue(5),
        paddingHorizontal: RFValue(10),
        fontSize: RFValue(14),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        paddingVertical: RFValue(10),
        textAlign: 'justify'
    },
    viewInputs3items: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subTitleViewInputs3items: {
        fontSize: RFValue(16),
        color: COLORS.BLACK,
        fontFamily: FONTS.TEXT,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },








    buttonRegister: {
        width:'50%',
        height: RFValue(50),
        borderRadius: RFValue(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BLACK,
        marginTop: RFValue(30),
        alignSelf: 'center'
    }
})