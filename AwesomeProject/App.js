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
    // Inicializando as variáveis de parametros
    var tempAgua = parseFloat(inputTempAgua);
    var ph = parseFloat(inputPH);
    var od = parseFloat(inputOD);
    var dbo = parseFloat(inputDBO);
    var turbidez = parseFloat(inputTurbidez);
    var nitrogênioTotal = parseFloat(inputNitrogênioTotal);
    var fosforoTotal = parseFloat(inputFosforoT);
    var coliformesTermoTolerantes = parseFloat(inputColiformesT);
    var solidosTotais = parseFloat(inputSolidosT)
    //var IETCL = parseFloat(inputIETCL);
    //var IETPT = parseFloat(inputIETPT);

    console.log("OD: "+calculaOD(od))
    console.log("PH: "+calcularPH(ph))
    console.log("Temp: "+calculaTempAgua(tempAgua))
    console.log("Tubidez: "+calcularTurbidez(turbidez));
    console.log("NT: "+calcularNitrogenioTotal(nitrogênioTotal));
    console.log("DBO: "+calcularDBO(dbo));
    console.log("Fósforo Total: " + fosforoTotal);
    console.log("Coliformes Termotolerantes: " + coliformesTermoTolerantes);
    console.log("Sólidos Totais: ", solidosTotais);
    //console.log("IET(CL): ", IETCL);
    //console.log("IET(PT): ", IETPT);

  };

  const calcularTurbidez = (inputTurbidez) => {
    let turbidezCalculada;
    if (inputTurbidez > 100) {
        turbidezCalculada = 5 ** 0.08;
    } else {

        turbidezCalculada = -26.45 * Math.log(inputTurbidez) + 136.39;
    }
    return turbidezCalculada;
  };

  const calcularNitrogenioTotal = (inputNitrogênioTotal) => {
    let nitrogenioTotalCalculado;
    if (inputNitrogênioTotal > 100) {
        nitrogenioTotalCalculado = 1 ** 0.1; 
    } else {

      nitrogenioTotalCalculado = -20.8 * Math.log(inputNitrogênioTotal) + 93.092;
    }
    return nitrogenioTotalCalculado;
  }

  const calcularDBO = (inputDBO) => {
    let dboCalculado;
    if (inputDBO > 30) {
        dboCalculado = 2 ** 0.1; 
    } else {

      dboCalculado = -30.1 * Math.log(inputDBO) + 103.45;
    }
    return dboCalculado;
  }
    function calculaTempAgua(tempAgua){
      if (tempAgua < -5){
        return 0.0;
      } else if(tempAgua > 15){
        return 9.0;
      } else{
        qTA = 92*Math.exp(-(((tempAgua-0)**2)/2)*(0.25**2))
        return qTA;
      }
    }
    function calcularPH(ph){
      if (ph < 2.0){
      return 2.0;
      } else if (ph > 12.0){
      return 3.0;
      } else {
        qPH= 93*(Math.exp(-((((ph-7.5)**2)/2)*(0.652**2))))
        return qPH;
      };
    }
    function calculaOD(od){
      if (od < 0){
        return 0.0;
      } else if(od > 140){
        return 47.0;
      } else {
        qOD = 100*Math.exp(-((((od-100)**2)/2)*(0.025**2)))
        return qOD;
      }; 

      function calculaFosforo(fosforoTotal){
        let qFT;
        if (fosforoTotal > 10){
          qFT = 0.1 ** 1
        }
        else {
          qFT = -15.49*Math.log(fosforoTotal)+37.202;
        }
        return qFT;
        }
        function calculaColiformes(coliformesTermoTolerantes){
          let qCT;
          if (coliformesTermoTolerantes > 10){
            qCT = 3 ** 0.15;
                }
          else {
            qCT = -8.723*Math.log(coliformesTermoTolerantes)+88.714;
      
          }
          return qCT;
      }
    
       function calculaSolidosTotais(solidosTotais){
        let qRT;
        if (solidosTotais > 500){
          qRT = 32**0.08;
        }
        else{ 
          qRT=80*Math.log(-(((solidosTotais-50)^2)/2*(0.003^2)))
        }
        return qRT;
    
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