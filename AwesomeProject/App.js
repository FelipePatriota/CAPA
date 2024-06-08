import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Modal, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import '@expo/metro-runtime'
import {Picker} from '@react-native-picker/picker';


function SelectionScreen({ navigation }) {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedReservoir, setSelectedReservoir] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);
  const [elementDisabled, setElementDisabled] = useState(false);
  const [yearDisabled, setYearDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState({ element: false, year: false, reservoir: false });
  const viewShotRef = useRef();

  const elements = ['Magnésio', 'Dureza', 'Condutividade', 'Alcalinidade', 'Amonia', 'Cloreto', 'Cor'];
  const years = [2020, 2021, 2022, 2023];
  const reservoirs = ['Tabocas', 'Severino\nGuerra', 'Pedro\nMoura'];

  const navigateToResults = () => {
    if (!selectedElement || !selectedYear || !selectedReservoir || !result) {
      Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, um ano, um reservatório e insira o resultado.');
      return;
    }

    const parsedResult = parseFloat(result);
    if (isNaN(parsedResult) || parsedResult < 0) {
      Alert.alert('Resultado Inválido', 'Por favor, insira um resultado válido.');
      return;
    }

    const newData = [...data, { x: parseInt(selectedYear) + offSet(selectedReservoir), y: parsedResult, label: selectedReservoir }];
    setData(newData);

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
    setData([]); // Clear chart data
  };

  const openModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: true });
  };

  const closeModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: false });
  };

  const selectItem = (type, value) => {
    if (type === 'element') {
      setSelectedElement(value);
      setElementDisabled(true);
    } else if (type === 'year') {
      setSelectedYear(value);
    } else if (type === 'reservoir') {
      setSelectedReservoir(value);
    }
    closeModal(type);
  };

  const renderModal = (type, data) => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible[type]}
      onRequestClose={() => closeModal(type)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectItem(type, item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => closeModal(type)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const Legend = () => {
    return (
      <View style={styles.legendContainer}>
        {reservoirs.map((reservoir) => (
          <View key={reservoir} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colocarCor(reservoir) }]} />
            <Text>{reservoir.replace('\n', ' ')}</Text>
          </View>
        ))}
      </View>
    );
  };

  const saveChartAsImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileName = `${FileSystem.documentDirectory}chart.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileName,
      });
      await Sharing.shareAsync(fileName);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a imagem. Tente novamente.');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: 10 }]}>
        <Text style={styles.label}>Elemento:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.input, styles.dropdown]}
            onPress={() => openModal('element')}
            disabled={elementDisabled}
          >
            <Text>{selectedElement || 'Selecione um elemento'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lockButton}
            onPress={() => setElementDisabled(!elementDisabled)}
          >
            <Text>{elementDisabled ? 'Desbloquear' : 'Bloquear'}</Text>
          </TouchableOpacity>
        </View>
        {renderModal('element', elements)}

        <Text style={styles.label}>Ano:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.input, styles.dropdown]}
            onPress={() => openModal('year')}
            disabled={yearDisabled}
          >
            <Text>{selectedYear || 'Selecione um ano'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lockButton}
            onPress={() => setYearDisabled(!yearDisabled)}
          >
            <Text>{yearDisabled ? 'Desbloquear' : 'Bloquear'}</Text>
          </TouchableOpacity>
        </View>
        {renderModal('year', years)}

        <Text style={styles.label}>Reservatório:</Text>
        <TouchableOpacity
          style={[styles.input, styles.dropdown]}
          onPress={() => openModal('reservoir')}
        >
          <Text>{selectedReservoir || 'Selecione um reservatório'}</Text>
        </TouchableOpacity>
        {renderModal('reservoir', reservoirs)}

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
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <View style={styles.chartContainer}>
            <VictoryChart width={400} domainPadding={25} theme={VictoryTheme.material}>
              <VictoryAxis
                tickValues={years} // Definindo os valores do eixo X como o array "years"
                tickFormat={(tick) => Math.floor(tick)}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(tick) => tick.toFixed(1)} // Definindo os valores do eixo Y como números inteiros
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
        </ViewShot>
        <TouchableOpacity
          style={[styles.touchableButton, { borderRadius: 20, marginTop: 10 }]}
          onPress={resetChart}
        >
          <Text style={styles.touchableButtonText}>Resetar Gráfico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableButton, { borderRadius: 20, marginTop: 10 }]}
          onPress={saveChartAsImage}
        >
          <Text style={styles.touchableButtonText}>Salvar Gráfico</Text>
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
  dropdown: {
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#22a0c9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

function offSet(selectedReservoir) {
  if (selectedReservoir == "Tabocas") {
    return -0.3;
  } else if (selectedReservoir == "Severino\nGuerra") {
    return 0;
  } else if (selectedReservoir == "Pedro\nMoura") {
    return 0.3;
  }
}

function colocarCor(selectedReservoir) {
  if (selectedReservoir == "Tabocas") {
    return '#8c1521';
  } else if (selectedReservoir == "Severino\nGuerra") {
    return '#163da8';
  } else if (selectedReservoir == "Pedro\nMoura") {
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