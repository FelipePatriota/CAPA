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
      <View style={[styles.container, { paddingTop: 40 }]}>
        <Text style={styles.title}>Selecionar Elementos</Text>

        <Text style={styles.label}>Elemento:</Text>
        {elements.map(element => (
          <TouchableOpacity
            key={element}
            style={[styles.touchableButton, { backgroundColor: selectedElement === element ? '#03bf2c' : '#22a0c9' }]}
            onPress={() => setSelectedElement(selectedElement === element ? '' : element)}
          >
            <Text style={styles.touchableButtonText}>{element}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Ano(s):</Text>
        {years.map(year => (
          <TouchableOpacity
            key={year}
            style={[styles.touchableButton, { backgroundColor: selectedYears.includes(year) ? '#03bf2c' : '#22a0c9' }]}
            onPress={() => setSelectedYears(prevYears => prevYears.includes(year) ? prevYears.filter(y => y !== year) : [...prevYears, year])}
          >
            <Text style={styles.touchableButtonText}>{year}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Reservatórios:</Text>
        {reservoirs.map(reservoir => (
          <TouchableOpacity
            key={reservoir}
            style={[styles.touchableButton, { backgroundColor: selectedReservoirs.includes(reservoir) ? '#03bf2c' : '#22a0c9' }]}
            onPress={() => setSelectedReservoirs(prevReservoirs => prevReservoirs.includes(reservoir) ? prevReservoirs.filter(r => r !== reservoir) : [...prevReservoirs, reservoir])}
          >
            <Text style={styles.touchableButtonText}>{reservoir}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.touchableButton}
          onPress={navigateToResults}
        >
          <Text style={styles.touchableButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ResultsScreen({ route }) {
  const { selectedElement, selectedYears, selectedReservoirs } = route.params;
  const [results, setResults] = useState([]);

  const addResultInput = () => {
    const newId = generateId();
    setResults([...results, { id: newId, year: '', reservoir: '', value: '' }]);
  };

  const saveResult = (id, year, reservoir, value) => {
    const index = results.findIndex(r => r.id === id);
    const updatedResults = [...results];
    updatedResults[index] = { id, year, reservoir, value };
    setResults(updatedResults);
  };

  const generateChart = () => {
    Alert.alert('Este gráfico está em desenvolvimento...');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 40 }]}>
        <Text style={styles.title}>Inserir Resultados</Text>
        <Text style={styles.label}>Elemento: {selectedElement}</Text>

        {results.map(result => (
          <View key={result.id}>
            <Text style={styles.label}>Ano:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o ano"
              keyboardType="numeric"
              value={result.year}
              onChangeText={text => saveResult(result.id, text, result.reservoir, result.value)}
            />
            <Text style={styles.label}>Reservatório:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o reservatório"
              value={result.reservoir}
              onChangeText={text => saveResult(result.id, result.year, text, result.value)}
            />
            <Text style={styles.label}>Resultado:</Text>
            <TextInput
              style={styles.input}
              placeholder={`Insira o valor para ${selectedElement}`}
              keyboardType="numeric"
              value={result.value}
              onChangeText={text => saveResult(result.id, result.year, result.reservoir, text)}
            />
          </View>
        ))}

        <TouchableOpacity
          style={styles.touchableButton}
          onPress={addResultInput}
        >
          <Text style={styles.touchableButtonText}>Adicionar Resultado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableButton}
          onPress={generateChart}
        >
          <Text style={styles.touchableButtonText}>Gerar Gráfico</Text>
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
    fontSize: 18,
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
        <Stack.Screen name="Selection" component={SelectionScreen} options={{ title: 'Seleção' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Resultados' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
