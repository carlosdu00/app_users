// src/screens/EditUserScreen.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  EditUser: { userId: number };
};

type EditUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "EditUser">;
  route: RouteProp<RootStackParamList, "EditUser">;
};

const EditUserScreen: React.FC<EditUserScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params; // Obtém o userId da rota
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://192.168.1.60:3000/users/${userId}`);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setLogin(user.login);
        setPassword(user.password);
        setCity(user.city);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditUser = async () => {
    try {
      await axios.put(`http://192.168.1.60:3000/users/${userId}`, {
        name,
        email,
        login,
        password,
        city,
      });
      navigation.goBack(); // Volta para a tela anterior após editar
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Editar Usuário" onPress={handleEditUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;
