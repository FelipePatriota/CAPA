import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";

export default function App() {
    const [inputTempAgua, setInputTA] = useState("");
    const [inputPH, setInputPH] = useState("");
    const [inputOD, setInputOD] = useState("");
    const [inputDBO, setInputDBO] = useState("");
    const [inputTurbidez, setInputTurbidez] = useState("");
    const [inputNitrogênioTotal, setInputNitrogênioTotal] = useState("");

  const handleButtonPress = () => {
    var tempAgua = parseFloat(inputTempAgua);
    var ph = parseFloat(inputPH);
    var od = parseFloat(inputOD);
    var dbo = parseFloat(inputDBO);
    var turbidez = parseFloat(inputTurbidez);
    var nitrogênioTotal = parseFloat(inputNitrogênioTotal);
    console.log("Temperatura da água: " + tempAgua);
    console.log("PH: " + ph);
    console.log("OD: " + od);
    console.log("DBO: " + dbo);
    console.log("Turbidez: " + turbidez);
    console.log("Nitrogênio Total: " + nitrogênioTotal);

  
  };
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
    fontFamily: "Arial",
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
    fontFamily: "Arial",
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

