import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";

export default function App() {
  const [input1, setInput1] = useState("");
  const [inputTHanos, setInputTHanos] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInputDBO] = useState("");
  const [input5, setInputTurbidez] = useState("");
  const [input6, setInputNitrogênioTotal] = useState("");


  const handleButtonPress = () => {
    var input1Teste = parseFloat(input1);
    var inputTHanosTeste = parseFloat(inputTHanos);
    var input3Teste = parseFloat(input3);
    var inputDBO = parseFloat(input4);
    var inputTurbidez = parseFloat(input5);
    var inputNitrogênioTotal = parseFloat(input6);
    console.log("Valor do Input 1: ", input1Teste);
    console.log("Valor do Input 2: ", inputTHanosTeste);
    console.log("Valor do Input 3: ", input3Teste);
    console.log("Valor do Input 4: ", inputDBO);
    console.log("Valor do Input 5: ", inputTurbidez);
    console.log("Valor do Input 6: ", inputNitrogênioTotal);
    
  };
  return (
    <>
      <View style={styles.container}>
        
        <TextInput
          style={style.input}
          placeholder="Dados1"
          inputMode="numeric"
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={style.input}
          placeholder="Dados2"
          inputMode="numeric"
          value={inputTHanos}
          onChangeText={setInputTHanos}
        />
         <TextInput
          style={style.input}
          placeholder="Dados3"
          inputMode="numeric"
          value={input3}
          onChangeText={setInput3}
        />
        <TextInput
          style={style.input}
          placeholder="Dados4"
          inputMode="numeric"
          value={input4}
          onChangeText={setInputDBO}
        />
        <TextInput
          style={style.input}
          placeholder="Dados5"
          inputMode="numeric"
          value={input5}
          onChangeText={setInputTurbidez}
        />
        <TextInput
          style={style.input}
          placeholder="Dados6"
          inputMode="numeric"
          value={input6}
          onChangeText={setInputNitrogênioTotal}
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

