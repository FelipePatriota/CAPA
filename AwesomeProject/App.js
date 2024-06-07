import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Picker, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";

function SelectionScreen({ navigation }) {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedReservoir, setSelectedReservoir] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);
  const [elementDisabled, setElementDisabled] = useState(false);
  const [yearDisabled, setYearDisabled] = useState(false);

  const elements = ['Magnésio', 'Dureza', 'Condutividade', 'Alcalinidade', 'Amonia', 'Cloreto', 'Cor'];
  const years = [2020, 2021, 2022, 2023];
  
  const reservoirs = ['Tabocas', 'Severino\nGuerra', 'Pedro\nMoura'];

  const navigateToResults = () => {
    if (!selectedElement || !selectedYear || !selectedReservoir || !result) {
      Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, um ano, um reservatório e insira o resultado.');
      return;
    }
    
    // Adicione o resultado aos dados
    if (result < 0){
      Alert.alert('Resultado Inválido', 'Por favor, insira um resultado válido.');
      return;
    } else if (result >= 0){
      const newData = [...data, { x: parseInt(selectedYear)+offSet(selectedReservoir), y: parseFloat(result), label: selectedReservoir}];
      setData(newData);
    } else{
      Alert.alert('Resultado Inválido', 'Por favor, insira um resultado válido.');
      return;
    }

    // Limpe os campos após adicionar
    if (!elementDisabled) {
      setSelectedElement('');
    }
    if (!yearDisabled) {
      setSelectedYear('');
    }
    setSelectedReservoir('');
    setResult('');
  };

  const resetChart = () => {
    setData([]); // Limpa os dados do gráfico
  };

  const Legend = () => {
    return (
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colocarCor('Tabocas') }]} />
          <Text>Tabocas</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colocarCor('Severino\nGuerra') }]} />
          <Text>Severino Guerra</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colocarCor('Pedro\nMoura') }]} />
          <Text>Pedro Moura</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 10 }]}>
        <Text style={styles.label}>Elemento:</Text>
        <View style={styles.inputContainer}>
          <Picker
            style={[styles.input, { flex: 1 }]}
            selectedValue={selectedElement}
            onValueChange={(itemValue) => {
              setSelectedElement(itemValue);
              setElementDisabled(true);
            }}
            enabled={!elementDisabled}
          >
            <Picker.Item label="Selecione um elemento" value=''enabled={false} />
            {elements.map((element, index) => (
              <Picker.Item key={index} label={element} value={element} />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.lockButton}
            onPress={() => setElementDisabled(!elementDisabled)}
          >
            <Text>{elementDisabled ? 'Desbloquear' : 'Bloquear'}</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.label}>Ano:</Text>
        <View style={styles.inputContainer}>
          <Picker
            style={[styles.input, { flex: 1 }]}
            selectedValue={selectedYear}
            onValueChange={(itemValue) => {
              setSelectedYear(itemValue);
            }}
            enabled={!yearDisabled}
          >
            <Picker.Item label="Selecione um ano" value="" />
            {years.map((year, index) => (
              <Picker.Item key={index} label={year.toString()} value={year} />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.lockButton}
            onPress={() => setYearDisabled(!yearDisabled)}
          >
            <Text>{yearDisabled ? 'Desbloquear' : 'Bloquear'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Reservatório:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedReservoir}
          onValueChange={(itemValue) => {
            setSelectedReservoir(itemValue);
          }}
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
          <VictoryChart width={400} domainPadding={25} theme={VictoryTheme.material}>
            <VictoryAxis
              tickValues={years} // Definindo os valores do eixo X como o array "years"
              tickFormat={(tick) => Math.floor(tick)}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) =>  tick.toFixed(1)} // Definindo os valores do eixo Y como números inteiros
            />
            <VictoryBar
              data={data}
              barWidth={20}
              style={{
                data: {
                  fill: ({ datum }) => colocarCor(datum.label),
                },
                labels: {
                  display: 'none',
                },  
              }}
              x="x"
              y="y"
            />
          </VictoryChart>
          <Legend />
        </View>
        <TouchableOpacity
        style={[styles.touchableButton, { borderRadius: 20, marginTop: 10 }]}
        onPress={resetChart}
      >
        <Text style={styles.touchableButtonText}>Resetar Gráfico</Text>
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
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 8,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  lockButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

function offSet(selectedResevoir){
  if(selectedResevoir == "Tabocas"){
    return -0.3;
  }
  else if(selectedResevoir== "Severino\nGuerra"){
    return 0;
  }
  else if(selectedResevoir== "Pedro\nMoura"){
    return 0.3;
  }
}

function colocarCor(selectedResevoir){
  if(selectedResevoir == "Tabocas"){
    return '#8c1521';
  }
  else if(selectedResevoir== "Severino\nGuerra"){
    return '#163da8';
  }
  else if(selectedResevoir== "Pedro\nMoura"){
    return '#541782';
  }
}

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