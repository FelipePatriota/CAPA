import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Picker, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

function SelectionScreen({ navigation }) {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedReservoir, setSelectedReservoir] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const elements = ['Magnésio', 'Dureza', 'Condutividade', 'Alcalinidade', 'Amonia', 'Cloreto', 'Cor'];
  const years = ['2020', '2021', '2022', '2023'];
  const reservoirs = ['Tabocas', 'Severino Guerra', 'Pedro Moura'];

  const navigateToResults = () => {
    if (!selectedElement || !selectedYear || !selectedReservoir || !result) {
      Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, um ano, um reservatório e insira o resultado.');
      return;
    }
    
    // Adicione o resultado aos dados
    const newData = [...data, { x: selectedElement, y: parseFloat(result) }];
    setData(newData);

    // Limpe os campos após adicionar
    setSelectedElement('');
    setSelectedYear('');
    setSelectedReservoir('');
    setResult('');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 10 }]}>
        
        <Text style={styles.label}>Elemento:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedElement}
          onValueChange={(itemValue) => setSelectedElement(itemValue)}
        >
          <Picker.Item label="Selecione um elemento" value="" />
          {elements.map((element, index) => (
            <Picker.Item key={index} label={element} value={element} />
          ))}
        </Picker>
        
        <Text style={styles.label}>Ano:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          <Picker.Item label="Selecione um ano" value="" />
          {years.map((year, index) => (
            <Picker.Item key={index} label={year} value={year} />
          ))}
        </Picker>

        <Text style={styles.label}>Reservatório:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedReservoir}
          onValueChange={(itemValue) => setSelectedReservoir(itemValue)}
        >
          <Picker.Item label="Selecione um reservatório" value="" />
          {reservoirs.map((reservoir, index) => (
            <Picker.Item key={index} label={reservoir} value={reservoir} />
          ))}
        </Picker>

        <Text style={styles.label}>Resultado:</Text>
        <TextInput
          style={styles.input}
          value={result}
          onChangeText={setResult}
          placeholder="Insira o resultado"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.touchableButton, { borderRadius: 20 }]}
          onPress={navigateToResults}
        >
          <Text style={styles.touchableButtonText}>Adicionar</Text>
        </TouchableOpacity>
        
        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar
              data={data}
              x="x"
              y="y"
            />
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

