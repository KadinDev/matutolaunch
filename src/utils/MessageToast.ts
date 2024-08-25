import Toast from "react-native-toast-message";

export const MessageLoginEmptyFields = () => {
    Toast.show({
        type: 'error',
        text1: 'Login',
        text2: 'Preencha os campos.'
    })
};

export const MessageLoginError = () => {
    Toast.show({
        type: 'error',
        text1: 'Não foi possível fazer o login',
        text2: 'Verifique se suas informações estão corretas.'
    })
};

export const MessageLoginSuccess = () => {
    Toast.show({
        type: 'success',
        text1: 'Login',
        text2: 'Seja bem vindo.'
    })
};

export const MessageEmailSend = () => {
    Toast.show({
        type: 'success',
        text1: 'Email',
        text2: 'Um e-mail foi enviado para redefinir sua senha.'
    })
};

export const MessageEmailError = () => {
    Toast.show({
        type: 'error',
        text1: 'Email',
        text2: 'Este e-mail não está em nosso sistema.'
    })
};

export const MessageNewAllocation = () => {
    Toast.show({
        type: 'success',
        text1: 'Nova Alocação',
        text2: 'Parabéns, você está em uma nova alocação.'
    })
};

export const MessageEditAllocation = () => {
    Toast.show({
        type: 'success',
        text1: 'Alocação',
        text2: 'Alocação editada.'
    })
};

export const MessageDeleteAllocation = () => {
    Toast.show({
        type: 'success',
        text1: 'Alocação Deletada',
        text2: 'Alocação encerrada com sucesso.'
    })
};