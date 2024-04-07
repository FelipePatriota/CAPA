import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [input1, setInput1] = useState("");

  const handleButtonPress = () => {
    console.log("Valor do Input 1:", input1);

    console.log("Valor do Input 3:", input3);
    
  };
  return (
    <View>
    <TextInput
          style={styles.input}
          placeholder="Dados"
          keyboardType="numeric"
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={styles.input}
          placeholder="Dados3"
          keyboardType="numeric"
          value={input1}
          onChangeText={setInput1}
        />
        <Button title="Executar" onPress={handleButtonPress} />
      </View>
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

