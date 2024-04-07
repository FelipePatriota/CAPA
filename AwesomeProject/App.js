import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [input1, setInput1] = useState("");
  const [inputTHanos, setInputTHanos] = useState("");
  const [input3, setInput3] = useState("");
  const [inputLD, setInputLD] = useState("");

  const handleButtonPress = () => {
    console.log("Valor do Input 1:", input1);
    console.log("Valor do Input THANOS:", inputTHanos);
    console.log("Valor do Input 3:", input3);
    console.log("Valor do Input 4: ", inputLD);
    
  };
  return (
    <>
      <View style={styles.container}>
        
        <TextInput
          style={styles.input}
          placeholder="Dados1"
          keyboardType="numeric"
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={styles.input}
          placeholder="THanos"
          keyboardType="numeric"
          value={inputTHanos}
          onChangeText={setInputTHanos}
        />
         <TextInput
          style={styles.input}
          placeholder="Dados3"
          keyboardType="numeric"
          value={input3}
          onChangeText={setInput3}
        />
         <TextInput
          style={style.input}
          placeholder="Dados 4"
          keyboardType="numeric"
          value={inputLD}
          onChangeText={setInputLD}
        />
        
        <Button title="Executar" onPress={handleButtonPress} />
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

