import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";

export default function App() {
  const [inputTempAgua, setInputTA] = useState("");
  const [inputPH, setInputPH] = useState("");
  const [inputOD, setInputOD] = useState("");
  const [inputDBO, setInputDBO] = useState("");
  const [inputTurbidez, setInputTurbidez] = useState("");
  const [inputNitrogênioTotal, setInputNitrogênioTotal] = useState("");
  const [inputFosforoT, setInputFosforoT] = useState("");
  const [inputColiformesT, setInputColiformesT] = useState("");
  const [inputSolidosT, setInputSolidosT] = useState("");


  const handleButtonPress = () => {
    var tempAgua = parseFloat(inputTempAgua);
    var ph = parseFloat(inputPH);
    var od = parseFloat(inputOD);
    var dbo = parseFloat(inputDBO);
    var turbidez = parseFloat(inputTurbidez);
    var nitrogênioTotal = parseFloat(inputNitrogênioTotal);
    var fosforoTotal = parseFloat(inputFosforoT);
    var ColiformesTermoTolerantes = parseFloat(inputColiformesT);
    var SolidosTotais = parseFloat(inputSolidosT)
    console.log("Temperatura da água: " + tempAgua);
    console.log("PH: " + ph);
    console.log("OD: " + od);
    console.log("DBO: " + dbo);
    console.log("Turbidez: " + turbidez);
    console.log("Nitrogênio Total: " + nitrogênioTotal);
    console.log("Fósforo Total: " + fosforoTotal);
    console.log("Coliformes Termotolerantes: " + ColiformesTermoTolerantes);
    console.log("Sólidos Totais: ", SolidosTotais);
  };



  const calcularTurbidez = (inputTurbidez) => {
    let turbidezCalculada;
    if (inputTurbidez > 100) {
        turbidezCalculada = 5 * 0.08; 
    } else {

        turbidezCalculada = -26.45 * Math.log(inputTurbidez) + 136.39;
    }
    return turbidezCalculada;
  };

  const calcularNitrogenioTotal = (inputNitrogênioTotal) => {
    let nitrogenioTotalCalculado;
    if (inputNitrogênioTotal > 100) {
        nitrogenioTotalCalculado = 1 * 0.1; 
    } else {

      nitrogenioTotalCalculado = -20.8 * Math.log(inputNitrogênioTotal) + 93.092;
    }
    return nitrogenioTotalCalculado;
  }

  const calcularDBO = (inputDBO) => {
    let dboCalculado;
    if (inputDBO > 30) {
        dboCalculado = 2 * 0.1; 
    } else {

      dboCalculado = -30.1 * Math.log(inputDBO) + 103.45;
    }
    return dboCalculado;
  }


  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={style.input}
          placeholder="Temperatura da água (°C)"
          inputMode="numeric"
          value={inputTempAgua}
          onChangeText={setInputTA}
        />
        <TextInput
          style={style.input}
          placeholder="PH"
          inputMode="numeric"
          value={inputPH}
          onChangeText={setInputPH}
        />
        <TextInput
          style={style.input}
          placeholder="OD"
          inputMode="numeric"
          value={inputOD}
          onChangeText={setInputOD}
        />
        <TextInput
          style={style.input}
          placeholder="DBO"
          inputMode="numeric"
          value={inputDBO}
          onChangeText={setInputDBO}
        />
        <TextInput
          style={style.input}
          placeholder="Turbidez"
          inputMode="numeric"
          value={inputTurbidez}
          onChangeText={setInputTurbidez}
        />
        <TextInput
          style={style.input}
          placeholder="Nitrogênio Total"
          inputMode="numeric"
          value={inputNitrogênioTotal}
          onChangeText={setInputNitrogênioTotal}
        />    
        <TextInput
          style={style.input}
          placeholder="Fósforo Total"
          inputMode="numeric"
          value={inputFosforoT}
          onChangeText={setInputFosforoT}
        />   
        <TextInput
          style={style.input}
          placeholder="Coliformes Termotolerantes"
          inputMode="numeric"
          value={inputColiformesT}
          onChangeText={setInputColiformesT}
        />   
        <TextInput
          style={style.input}
          placeholder="Sólidos Totais"
          inputMode="numeric"
          value={inputSolidosT}
          onChangeText={setInputSolidosT}
        />   
        
        <TouchableOpacity style={style.touchableButton} onPress={handleButtonPress}>
          <Text style={style.touchableButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  touchableButton: {
    backgroundColor: "#2e97b7",
    color: "white",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  touchableButtonText: {
    color: "white",
    fontSize: 20,
  },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
});