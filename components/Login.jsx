import React, { useState } from 'react';
import { Alert, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase'; // Importando o auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Importando a função de login

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function logIn() {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('Routes', { email });
            })
            .catch((error) => {
                Alert.alert('Erro', error.message);
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça login</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
            />
            <TextInput
                style={styles.input}
                placeholder="Digite a senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCompleteType="password"
            />

            <TouchableOpacity style={styles.button} onPress={logIn} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 45,
        backgroundColor: '#B6BBDC',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 5
    },
    button: {
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;
