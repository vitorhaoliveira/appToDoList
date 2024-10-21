import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function ChangeCriptos({ navigation, route }) {
    const id = route.params.id;

    const [nameCripto, setNameCripto] = useState(route.params.nameCripto);
    const [acronymCripto, setAcronymCripto] = useState(route.params.acronymCripto);
    const [valueCripto, setValueCripto] = useState(route.params.valueCripto);

    async function ChangeData(id, nameCripto, acronymCripto, valueCripto) {
        try {
            await updateDoc(doc(collection(firestore, "tbcoin"), id), {
                nameCripto,
                acronymCripto,
                valueCripto
            })
            Alert.alert("Succes", "The cripto has been updated successfully");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Error to change", error);
            Alert.alert("Error", "Error to change cripto");
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tittle}>Alterar tarefa</Text>
            </View>

            <View>
                <TextInput 
                    style={styles.input}
                    autoCapitalize="words"
                    placeholder="Digite a tarefa"
                    onChangeText={(text) => setNameCripto(text)}
                    value={nameCripto}
                />
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={() => ChangeData(id, nameCripto, acronymCripto, valueCripto)}
                >
                    <Text style={styles.sendButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#B6BBDC',
    },
    tittle: {
        fontSize: 25,
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        fontSize: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        width: '90%',
    },
    sendButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});