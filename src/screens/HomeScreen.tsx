import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os tipos para a navegação
type RootStackParamList = {
  UserDetails: { userId: number };
  EditUser: { userId: number };
  AddUser: undefined; // Não espera parâmetros
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// Defina o tipo User com as propriedades que o UserCard espera
interface User {
  id: number;
  name: string;
  email: string;
  login: string;
  city: string;
}

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.1.60:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  // Função para deletar um usuário
  const handleDeleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            name={item.name}
            email={item.email}
            login={item.login}
            city={item.city}
            onDelete={() => handleDeleteUser(item.id)} // Passando a função de deletar
          />
        )}
        contentContainerStyle={styles.list}
      />
      <Footer />
      <Button
        title="Adicionar Usuário"
        onPress={() => navigation.navigate("AddUser")} // Navegando para AddUser sem parâmetros
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
