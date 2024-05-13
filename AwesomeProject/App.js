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
  const { selectedElement } = route.params;
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);

  const addResultInput = () => {
    const newId = generateId(); // Generate a new ID for the result
    setResults([...results, { id: newId, year: '', reservoir: '', value: '' }]);
  };
  
  const saveResult = (id, year, reservoir, value) => {
    const index = results.findIndex(r => r.id === id);
    const updatedResults = [...results];
    updatedResults[index] = { id, year, reservoir, value };
    setResults(updatedResults);
    updateChartData(updatedResults);
  };

  const updateChartData = (results) => {
    // Generate chart data from results
    const data = results.map(result => ({ x: result.year, y: parseFloat(result.value) }));
    setChartData(data);
  };

 // Dentro do componente ResultsScreen


 return (
  <ScrollView style={{ flex: 1 }}>
    <View style={[styles.container, { paddingTop: 40 }]}>
      <Text style={styles.title}>Inserir Resultados</Text>
      <Text style={styles.label}>Elemento: {selectedElement}</Text>
      
      {/* Renderizar apenas um conjunto de caixas de entrada */}
      <View>
        <Text style={styles.label}>Ano:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o ano"
          keyboardType="numeric"
          value={results.length > 0 ? results[0].year : ''}
          onChangeText={text => saveResult(results.length > 0 ? results[0].id : '', text, results.length > 0 ? results[0].reservoir : '', results.length > 0 ? results[0].value : '')}
        />
        <Text style={styles.label}>Reservatório:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o reservatório"
          value={results.length > 0 ? results[0].reservoir : ''}
          onChangeText={text => saveResult(results.length > 0 ? results[0].id : '', results.length > 0 ? results[0].year : '', text, results.length > 0 ? results[0].value : '')}
        />
        <Text style={styles.label}>Resultado:</Text>
        <TextInput
          style={styles.input}
          placeholder={`Insira o valor para ${selectedElement}`}
          keyboardType="numeric"
          value={results.length > 0 ? results[0].value : ''}
          onChangeText={text => saveResult(results.length > 0 ? results[0].id : '', results.length > 0 ? results[0].year : '', results.length > 0 ? results[0].reservoir : '', text)}
        />
      </View>

      <TouchableOpacity
        style={styles.touchableButton}
        onPress={addResultInput}
      >
        <Text style={styles.touchableButtonText}>Adicionar Resultado</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {}}
      >
        <Text style={styles.touchableButtonText}>Gerar Gráfico</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar data={chartData} />
        </VictoryChart>
      </View>
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

// Navigation
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