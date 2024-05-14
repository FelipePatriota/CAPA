import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Picker, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

function SelectionScreen({ navigation }) {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedReservoirs, setSelectedReservoirs] = useState([]);

  const years = ['2020', '2021', '2022', '2023']; // anos disponíveis nas tabelas 
  const reservoirs = ['Tabocas', 'Severino Guerra', 'Pedro Moura']; // reservatórios disponíveis
  const elements = ['Magnésio', 'Dureza', 'Condutividade', 'Alcalinidade', 'Amonia', 'Cloreto', 'Cor']; // elementos disponíveis

  const navigateToResults = () => {
    if (!selectedElement || selectedYears.length === 0 || selectedReservoirs.length === 0) {
      Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, pelo menos um ano e pelo menos um reservatório.');
      return;
    }
    navigation.navigate('Results', { selectedElement, selectedYears, selectedReservoirs });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 10 }]}>
        
        <Text style={styles.label}>Elemento:</Text>
        <select style={styles.input}>
          <option value="Magnésio">Magnésio</option>
          <option value="Dureza">Dureza</option>
          <option value="Condutividade">Condutividade</option>
          <option value="Alcalinidade">Alcalinidade</option>
          <option value="Amonia">Amonia</option>
          <option value="Cloreto">Cloreto</option>
          <option value="Cor">Cor</option>
        </select>
    
        <Text style={styles.label}>Ano(s):</Text>
        <select style={styles.input}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        <Text style={styles.label}>Reservatórios:</Text>
        <select style={styles.input}>
          <option value="Tabocas">Tabocas</option>
          <option value="Severino Guerra">Severino Guerra</option>
          <option value="Pedro Moura">Pedro Moura</option>
        </select>

        <Text style={styles.label}>Resultado:</Text>
        <TextInput style={styles.input}>
        </TextInput>

      <TouchableOpacity
        style={[styles.touchableButton, { borderRadius: 20 }]} 
      >
        
        <Text style={styles.touchableButtonText}>Add</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  touchableButton: {
    backgroundColor: '#22a0c9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  touchableButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 8,
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

// navegação
const Stack = createStackNavigator();
r
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen name="Selection" component={SelectionScreen} options={{ title: 'Ensaio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

