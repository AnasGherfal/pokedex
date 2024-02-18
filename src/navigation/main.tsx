import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pokemon } from "../screens/pokemons/list";
import { Details } from "../screens/pokemons/details";
import { Search } from "../screens/pokemons/search";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { MainStack } from "./model";

const stack = createNativeStackNavigator<MainStack>();

export function MainNavigation() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Pokemons"
        component={Pokemon}
        options={({ navigation }) => ({
          headerLargeTitle: true,
          headerTitle: "Pokedex",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MaterialIcons name="search" color="black" size={32} />
            </TouchableOpacity>
          ),
        })}
      />
      <stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />
      <stack.Group screenOptions={{ presentation: "modal" }}>
        <stack.Screen name="Search" component={Search} />
      </stack.Group>
    </stack.Navigator>
  );
}
