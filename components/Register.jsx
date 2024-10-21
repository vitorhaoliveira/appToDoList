import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function RegisterCriptos({ navigation }) {
  const [nameCripto, setNameCripto] = useState("");
  const [acronymCripto, setAcronymCripto] = useState("");
  const [valueCripto, setValueCripto] = useState("");

  async function addCripto() {
    try {
      const docRef = await addDoc(collection(firestore, "tbcoin"), {
        nameCripto: nameCripto,
        acronymCripto: acronymCripto,
        valueCripto: valueCripto,
      });
      console.log("Document registered with ID: ", docRef.id);
      Alert.alert("Register", "Record successfully registered");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error registering cripto: ", error);
      Alert.alert("Error", "Failed to register cripto");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar tarefa</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        placeholder="Digite o nome da tarefa"
        onChangeText={setNameCripto}
        value={nameCripto}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={addCripto}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#B6BBDC",
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "90%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30
  },
  sendButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
