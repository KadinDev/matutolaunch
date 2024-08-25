import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';

import Toast from 'react-native-toast-message';

import {auth} from '../services/firebaseConfig';
import {
    MessageLoginEmptyFields,
    MessageLoginError,
    MessageEmailSend,
    MessageEmailError
} from '@utils/MessageToast';

import {
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';

import {
    getDoc,
    doc,
    getFirestore,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name?: string;
};

type AuthContextData = {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOutUser: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    load: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext( {} as AuthContextData );

const USER_COLLECTION = '@matutolaunch:users';

function AuthProvider( {children} : AuthProviderProps){
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function signIn(email: string, password: string){
        if(!email || !password){
            return MessageLoginEmptyFields();
        };

        setLoad(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const firestore = getFirestore();

            const userDocRef = doc(firestore, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if(userDocSnapshot.exists()){
                const userData = userDocSnapshot.data() as User;
                setUser(userData);
                await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
                setLoad(false);
            };

        } catch (error) {
            if(error === 'auth/user-not-found' || error === 'auth/wrong-password') {
                MessageLoginError();
                setLoad(false);
                return;
            }
            else {
                MessageLoginError();
                setLoad(false);
                return;
            };
        }
    };
    
    async function signOutUser(){
        await signOut(auth);
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);
    };

    async function loadUserStorageData(){
        const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
        if(storedUser){
            const userData = JSON.parse(storedUser) as User;
            setUser(userData);
        };
    };

    async function forgotPassword(email: string){
        if(!email){
            return MessageLoginEmptyFields();
        };
        setLoad(true);

        await sendPasswordResetEmail(auth, email)
        .then( () =>  MessageEmailSend())
        .catch(() => MessageEmailError())

        setLoad(false);
    };

    useEffect(() => {
        loadUserStorageData();
    },[]);

    return (
        <>
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOutUser,
                forgotPassword,
                load
            }}
        >
            {children}
        </AuthContext.Provider>

        <Toast/>
        </>
    );

};

function useAuth(){
    const context = useContext(AuthContext);
    return context;
};

export {AuthProvider, useAuth};