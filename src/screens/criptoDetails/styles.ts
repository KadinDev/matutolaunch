import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_800,
    },
    viewImage: {
        width: '100%',
        height: RFValue(250),
        backgroundColor: COLORS.WHITE_100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    buttonBack: {
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(20),
        position: 'absolute',
        top: RFValue(50),
        left: RFValue(20),
        backgroundColor: COLORS.WHITE_800,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    buttonGoEdit: {
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(20),
        position: 'absolute',
        top: RFValue(50),
        right: RFValue(20),
        backgroundColor: COLORS.WHITE_800,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    image: {
        width: RFValue(150),
        height: RFValue(150),
        borderRadius: RFValue(80),
        borderWidth: 3,
        borderColor: COLORS.BLACK
    },
    content: {
        backgroundColor: COLORS.WHITE_800,
        paddingHorizontal: RFValue(20),
        paddingTop: RFValue(20),
        marginTop: RFValue(-30),
        borderTopLeftRadius: RFValue(30),
        borderTopRightRadius: RFValue(30),
    },
    date: {
        fontSize: RFValue(12),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        backgroundColor: COLORS.WHITE_100,
        width: RFValue(80),
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5),
        textAlign: 'center',
        borderRadius: RFValue(50),
        marginBottom: RFValue(10)
    },
    name: {
        fontSize: RFValue(30),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        marginBottom: RFValue(10),
        lineHeight: RFValue(32),
        textTransform: 'capitalize'
    },
    description: {
        fontSize: RFValue(14),
        lineHeight: RFValue(20),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        textAlign: 'justify',
        marginBottom: RFValue(20),
    },
    viewDetails: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: RFValue(20)
    },
    viewDetailsTgeAndCliff: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: RFValue(20)
    },
    viewDetails2items: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: RFValue(20)
    },
    boxDetails: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleBoxDetails: {
        fontSize: RFValue(12),
        lineHeight: RFValue(14),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: RFValue(5),
    },
    subTitleBoxDetails: {
        fontSize: RFValue(12),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        backgroundColor: COLORS.WHITE_100,
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5),
        textAlign: 'center',
        borderRadius: RFValue(50),
        marginBottom: RFValue(10),
        textTransform: 'capitalize',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: RFValue(40),
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: RFValue(20),
        borderRadius: RFValue(30)
    },
    titleInput: {
        fontSize: RFValue(12),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    viewInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        height: RFValue(40),
        backgroundColor: COLORS.WHITE_100,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: RFValue(10),
        borderRadius: RFValue(20),
        fontSize: RFValue(14),
        fontFamily: FONTS.TEXT,
        color: COLORS.BLACK,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    buttonInput: {
        width: RFValue(40),
        height: RFValue(40),
        backgroundColor: COLORS.WHITE_100,
        borderRadius: RFValue(20),
        alignItems: 'center',
        justifyContent: 'center'
    }
})