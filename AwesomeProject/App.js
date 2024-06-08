import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import  SelectionScreen  from "./src/components/Main";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen name="Selection" component={SelectionScreen} options={{ title: 'Ensaio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
