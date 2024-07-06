
import {
    TextInput,
    TextInputProps
} from 'react-native';

import {styles} from './styles';

type TypeProps = 'small' | 'medium' | 'large';

interface Props extends TextInputProps {
    type: TypeProps;
};

export function Input({type, ...rest} : Props){

    const inputStyle = [
        styles.input,
        type === 'small' ? styles.smallInput :
        type === 'medium' ? styles.mediumInput :
        styles.largeInput
    ];

    return (
        <TextInput
            {...rest}
            style={inputStyle}
        />
    )
}