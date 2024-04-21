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
  //const [inputIETCL, setInputCL] = useState("");
  //const [inputIETPT, setInputPT] = useState("");

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
    //var IETCL = parseFloat(inputIETCL);
    //var IETPT = parseFloat(inputIETPT);
   

    console.log("Temperatura da água: " + tempAgua);
    console.log("PH: " + ph);
    console.log("OD: " + od);
    console.log("DBO: " + dbo);
    console.log("Turbidez: " + turbidez);
    console.log("Nitrogênio Total: " + nitrogênioTotal);
    console.log("Fósforo Total: " + fosforoTotal);
    console.log("Coliformes Termotolerantes: " + ColiformesTermoTolerantes);
    console.log("Sólidos Totais: ", SolidosTotais);
    //console.log("IET(CL): ", IETCL);
    //console.log("IET(PT): ", IETPT);
   



  function calculaFosforo(fosforoTotal){
    let qFT;
    if (fosforoTotal > 10){
      qFT = 0.1 * 1
    }
    else {
      qFT = -15.49*Math.log(fosforoTotal)+37.202;
    }
    return qFT;
    }
    function calculaColiformes(ColiformesTermoTolerantes){
      let qCT;
      if (ColiformesTermoTolerantes > 10){
        qCT = 3 ** 0.15;
            }
                  else {
        qCT = -8.723*Math.log(ColiformesTermoTolerantes)+88.714;
  
      }
      return qCT;
  }

   function calculaSolidosTotais(SolidosTotais){
    let qRT;
    if (SolidosTotais > 500){
      qRT = 32**0.08;
    
    }
    else{ 
      qRT=80*Math.log(-(((SolidosTotais-50)^2)/2*(0.003^2)))
    }

   }
  //  function calculaCL(IETCL){
  //   var cl = (10*(6-((-0,7-(0,6*Math.log(IETCL)))/Math.log(2))))-20;
  //   return cl;
  //  }

  //  function calculPT(IETPT){
  //   var pt = (10*(6-((-0,42-(0,36*Math.log(IETPT)))/Math.log(2))))-20
  //   return pt;
  //  }

  // function calculIET(cl, pt){
  //   var iet = (cl + pt)/2;
  //   return iet;
  //
  // }
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
        <TextInputInput
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


        {/* <TextInput
          style={style.input}
          placeholder="IET(CL)"
          inputMode="numeric"
          value={inputIETCL}
          onChangeText={setInputCL}
        />   
        <TextInput
          style={style.input}
          placeholder="IET(PT)"
          inputMode="numeric"
          value={inputIETPT}
          onChangeText={setInputPT}
        />   
        <TextInput
          style={style.input}
          placeholder="IET"
          inputMode="numeric"
          value={inputIET}
          onChangeText={setInputIET}
        />    */}
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