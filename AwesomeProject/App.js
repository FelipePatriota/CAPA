import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function SelectionScreen({ navigation }) {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedReservoirs, setSelectedReservoirs] = useState([]);
  const [result, setResult] = useState('');

  const years = ['2020', '2021', '2022', '2023']; // anos disponíveis nas tabelas 
  const reservoirs = ['Tabocas', 'Severino Guerra', 'Pedro Moura']; // reservatórios disponíveis
  const elements = ['Magnésio', 'Dureza', 'Condutividade', 'Alcalinidade', 'Amonia', 'Cloreto', 'Cor']; // elementos disponíveis

  const navigateToResults = () => {
    if (!selectedElement || selectedYears.length === 0 || selectedReservoirs.length === 0 || !result) {
      Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, pelo menos um ano, pelo menos um reservatório e insira um resultado.');
      return;
    }
    navigation.navigate('Results', { selectedElement, selectedYears, selectedReservoirs, result });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 10 }]}>
        
        <Text style={styles.label}>Elemento:</Text>
        <select
          style={styles.input}
          value={selectedElement}
          onValueChange={(itemValue) => setSelectedElement(itemValue)}
        >
          {elements.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
        
        <Text style={styles.label}>Ano(s):</Text>
        <select
          style={styles.input}
          value={selectedYears}
          onValueChange={(itemValue) => setSelectedYears(itemValue)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Text style={styles.label}>Reservatórios:</Text>
        <select
          style={styles.input}
          value={selectedReservoirs}
          onValueChange={(itemValue) => setSelectedReservoirs(itemValue)}
        >
          {reservoirs.map((reservoir) => (
            <option key={reservoir} value={reservoir}>
              {reservoir}
            </option>
          ))}
        </select>

        <Text style={styles.label}>Resultado:</Text>
        <TextInput
          style={styles.input}
          value={result}
          onChangeText={(text) => setResult(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.touchableButton, { borderRadius: 20 }]} 
          onPress={navigateToResults}
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
});

// navegação
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
