// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AddUserScreen from "./src/screens/AddUser"; // Importa a nova tela
import EditUserScreen from "./src/screens/EditUserScreen"; // Importa a tela de edição

// Define os parâmetros que as telas esperam
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  AddUser: undefined; // Define a tela de adicionar usuário
  EditUser: { userId: number }; // Define a tela de edição
};

// Criando o Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Lista de Usuários" }} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: "Detalhes do Usuário" }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: "Adicionar Usuário" }} />
      <Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: "Editar Usuário" }} />
    </Stack.Navigator>
  );
};

// Criando o Drawer Navigator
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack">
        <Drawer.Screen name="HomeStack" component={HomeStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
