import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryLabel, VictoryScatter, VictoryAxis } from "victory-native";


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

  const [dia, onChangeDia] = React.useState('');
  const [mes, onChangeMes] = React.useState('');
  const [ano, onChangeAno] = React.useState('');
  const [value, onChangeValue] = React.useState('');
  const [data, setData] = useState([]); //valores
  const [date, setDate] = useState([]); //array para settar as datas do X



  const handleButtonPress = () => {
    // Inicializando as variáveis de parametros
    var tempAgua = parseFloat(inputTempAgua);
    var ph = parseFloat(inputPH);
    var od = parseFloat(inputOD);
    var dbo = parseFloat(inputDBO);
    var turbidez = parseFloat(inputTurbidez);
    var nitrogênioTotal = parseFloat(inputNitrogênioTotal);
    var fosforoTotal = parseFloat(inputFosforoT);
    var ColiformesTermoTolerantes = parseFloat(inputColiformesT);
    var SolidosTotais = parseFloat(inputSolidosT)
    
    console.log("OD: "+calculaOD(od))
    console.log("PH: "+calcularPH(ph))
    console.log("Temp: "+calculaTempAgua(tempAgua))
    console.log("Tubidez: "+calcularTurbidez(turbidez));
    console.log("NT: "+calcularNitrogenioTotal(nitrogênioTotal));
    console.log("DBO: "+calcularDBO(dbo));
    
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
        <VictoryChart
                    theme={VictoryTheme.material} maxDomain={{ y: 100 }} minDomain={{ y: 0 }} responsive={true} scale={{ x: 'time' }}
                >
                    <VictoryAxis dependentAxis crossAxis
                        tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} //valores do Y
                    />
                    <VictoryAxis crossAxis //Valores do X
                        style={{ tickLabels: { fontSize: 8 } }} //font do X label
                        data={date}
                        tickCount={date.length}
                        tickValues={date}
                        tickFormat={(x) => {
                            return x.toLocaleString("pt-BR",
                                { day: "numeric", month: "numeric", year: 'numeric' }) //formatar datas
                        }
                        }
                        tickLabelComponent={
                            <VictoryLabel angle={-45} textAnchor="end" /> //angulo do X
                        }
                    />
                    <VictoryScatter
                        style={{ data: { fill: "#72e073" } }} //pontos
                        size={5}
                        data={data}
                    />
                    <VictoryLine sortOrder="ascending"
                        style={{
                            data: { stroke: "#72e073" },
                            parent: { border: "1px solid #ccc" }, //linha

                        }}
                        data={data}

                    />
                </VictoryChart>
                <VictoryLegend x={10} y={25}
                    orientation="horizontal"
                    height={150}
                    gutter={20}
                    itemsPerRow={3}
                    style={{ border: { stroke: "black" } }}
                    colorScale={["red", "orange", "yellow", "lightgreen", 'lightblue']}
                    data={[
                        { name: "0-25 Péssima" }, { name: "26-50 Ruim" }, { name: "51-70 Regular" }, { name: "71-90 Boa" }, { name: "91-100 Ótima" }
                    ]}
                />
        

      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 30,
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
