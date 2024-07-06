
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
    icon: keyof typeof Feather.glyphMap;
    color: string;
};

export function Icon({icon, color} : Props){
    return (
        <Feather
            name={icon}
            size={RFValue(20)}
            color={color}
        />
    )
}