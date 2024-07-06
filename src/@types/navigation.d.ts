
import {CriptoDTO} from '@utils/CriptoDTO';

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            register: undefined | CriptoDTO;
            criptoDetails: { cripto: CriptoDTO };
            splash: undefined;
        }
    }
}