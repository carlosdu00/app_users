// src/components/UserCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

type RootStackParamList = {
  UserDetails: { userId: number };
  EditUser: { userId: number };
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
  login: string;
  city: string;
  onDelete: (id: number) => void; // Função para deletar o usuário
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email, login, city, onDelete }) => {
  const navigation = useNavigation<UserCardNavigationProp>();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.60:3000/users/${id}`);
      onDelete(id); // Chama a função para atualizar a lista após excluir
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>Email: {email}</Text>
      <Text>Login: {login}</Text>
      <Text>Cidade: {city}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UserDetails", { userId: id })}
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditUser", { userId: id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
  },
});

export default UserCard;
