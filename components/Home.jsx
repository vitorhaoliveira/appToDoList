import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [criptos, setCriptos] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, "tbcoin", id));
            Alert.alert("Success", "The cripto was deleted");
        } catch (error) {
            console.error("Error deleting cripto: ", error);
            Alert.alert("Error", "Can't delete cripto");
        }
    }

    useEffect(() => {
        const collectionRef = collection(firestore, "tbcoin");

        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setCriptos(list);
        }, (error) => {
            console.error("Error fetching snapshot: ", error);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To do list</Text>

            <FlatList
                data={criptos}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate("Change", {
                                id: item.id,
                                nameCripto: item.nameCripto,
                                acronymCripto: item.acronymCripto,
                                valueCripto: item.valueCripto
                            })}
                        >
                            <Text>Tarefa: {item.nameCripto}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                Alert.alert(
                                    "Confirm Deletion",
                                    "Are you sure you want to delete this cripto?",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                        },
                                        {
                                            text: "Delete",
                                            onPress: () => deleteCripto(item.id),
                                            style: "destructive",
                                        },
                                    ]
                                );
                            }}
                        >
                            <Text style={styles.deleteButtonText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#B6BBDC',
    },
    title: {
        fontSize: 25,
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
    },
});
