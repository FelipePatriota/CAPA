import React, { useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import AddButton from "../Buttons/AddButton";
import ModalComponent from "../Modal";
import { styles } from "./style/style";

export default function Form(props) {

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

    const { onDataChanged, resetButtonPressed, setResetButtonPressed } = props;
  
    const [modalVisible, setModalVisible] = useState({ element: false, year: false, reservoir: false });

    const openModal = (type) => {
        setModalVisible({ ...modalVisible, [type]: true });
    };

   useEffect(() => {
       if (resetButtonPressed) {
        setData([]);
        onDataChanged([], []);
        setResetButtonPressed(false);
    }
   }, [resetButtonPressed]);

    

    const navigateToResults = () => {
        if (!selectedElement || !selectedYear || !selectedReservoir || !result) {
            Alert.alert('Seleção Incompleta', 'Por favor, selecione um elemento, um ano, um reservatório e insira o resultado.');
            return;
        }

        // Adicione o resultado aos dados
        if (result < 0) {
            Alert.alert('Resultado Inválido', 'Por favor, insira um resultado válido.');
            return;
        } else if (result >= 0) {
            const newData = [...data, { x: parseInt(selectedYear) + offSet(selectedReservoir), y: parseFloat(result), label: selectedReservoir }];
            setData(newData);
            onDataChanged(years, newData);
        } else {
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
    setElementDisabled
    function offSet(selectedResevoir) {
        if (selectedResevoir == "Tabocas") {
            return -0.3;
        }
        else if (selectedResevoir == "Severino\nGuerra") {
            return 0;
        }
        else if (selectedResevoir == "Pedro\nMoura") {
            return 0.3;
        }
    }

    return (

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
                <ModalComponent 
                type = 'element' 
                data = {elements} 
                modalVisible = {modalVisible} 
                setModalVisible = {setModalVisible}
                selectedElement = {selectedElement}
                setSelectedElement = {setSelectedElement}
                selectedYear = {selectedYear}
                setSelectedYear = {setSelectedYear}
                selectedReservoir = {selectedReservoir}
                setSelectedReservoir = {setSelectedReservoir}
                setElementDisabled = {setElementDisabled}
                >
                </ModalComponent>

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
                <ModalComponent
                    type='year'
                    data={years}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedReservoir={selectedReservoir}
                    setSelectedReservoir={setSelectedReservoir}
                    setElementDisabled={setElementDisabled}
                >
                </ModalComponent>
               
                <Text style={styles.label}>Reservatório:</Text>
                <TouchableOpacity
                    style={[styles.input, styles.dropdown]}
                    onPress={() => openModal('reservoir')}
                >
                <ModalComponent
                    type='reservoir'
                    data={reservoirs}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedReservoir={selectedReservoir}
                    setSelectedReservoir={setSelectedReservoir}
                    setElementDisabled={setElementDisabled}
                >
                </ModalComponent>
                    
                
                    <Text>{selectedReservoir || 'Selecione um reservatório'}</Text>
                </TouchableOpacity>
              
                <Text style={styles.label}>Resultado:</Text>
                <TextInput
                    style={styles.input}
                    value={result}
                    onChangeText={setResult}
                    placeholder="Insira o resultado"
                    keyboardType="numeric"
                />
                <AddButton onPress={navigateToResults} />
               

               
            </View>
        
    );
}