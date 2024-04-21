import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";

export default function App() {
  const [input1, setInput1] = useState("");
  const [inputTHanos, setInputTHanos] = useState("");
  const [input3, setInput3] = useState("");
  const [inputLD, setInputLD] = useState("");
  const [input5, setInput5] = useState("");

  const handleButtonPress = () => {
    const [inputTempAgua, setInputTA] = useState("");
    const [inputPH, setInputPH] = useState("");
    const [inputOD, setInputOD] = useState("");
    const [inputDBO, setInputDBO] = useState("");
    const [inputTurbidez, setInputTurbidez] = useState("");
    const [inputNitrogênioTotal, setInputNitrogênioTotal] = useState("");
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
          placeholder="OD"
          inputMode="numeric"
          value={input5}
          onChangeText={setInput5}
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

