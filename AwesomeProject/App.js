import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryLabel, VictoryScatter, VictoryAxis } from "victory-native";
import { ScrollView } from 'react-native';

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

  const [dia, onChangeDia] = React.useState('');
  const [mes, onChangeMes] = React.useState('');
  const [ano, onChangeAno] = React.useState('');
  const [value, onChangeValue] = React.useState('');
  const [data, setData] = useState([]); //valores
  const [date, setDate] = useState([]); //array para settar as datas do X


  const addDataPoint = () => {
    var tempAgua = parseFloat(inputTempAgua);
    var ph = parseFloat(inputPH);
    var od = parseFloat(inputOD);
    var dbo = parseFloat(inputDBO);
    var turbidez = parseFloat(inputTurbidez);
    var nitrogênioTotal = parseFloat(inputNitrogênioTotal);
    var fosforoTotal = parseFloat(inputFosforoT);
    var coliformesTermoTolerantes = parseFloat(inputColiformesT);
    var ResiduosTotais = parseFloat(inputSolidosT);


    var IQA = calculaIQA(tempAgua, ph, od, dbo, turbidez, nitrogênioTotal, fosforoTotal, coliformesTermoTolerantes, ResiduosTotais);
    console.log("IQA: ", IQA)
    var localDate = new Date(ano, mes - 1, dia); //formatar a data para o luxon

    // const newDataPoint = { x: new Date(ano, mes - 1, dia), y: valorCalculado, cor: novaCor };
    // setData([...data, newDataPoint]); // Adicionando novo ponto de dados ao estado
    // setDate([...date, new Date(ano, mes - 1, dia)]); // Adicionando nova data ao estado


    const newDataPoint = { x: localDate, y: Number(IQA) }; //formatar a data para o luxon
    setData([...data, newDataPoint]); //colocar no Y
    setDate([...date, localDate]) //colocar no X
};
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingVertical: 150 }]}>
          <TextInput
            style={styles.input}
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
          <TextInput
          style={styles.input}
          onChangeText={onChangeDia}
          value={dia}
          placeholder={"Digite o dia, exemplo: 01, 10..."}
          keyboardType='numeric'

        />
          <TextInput
          style={styles.input}
          onChangeText={onChangeMes}
          value={mes}
          placeholder={"Digite o mês, exemplo: 07, 12..."}
          keyboardType='numeric'

        />
          <TextInput
          style={styles.input}
          onChangeText={onChangeAno}
          value={ano}
          placeholder={"Digite o ano, exemplo: 2022, 2018..."}
          keyboardType='numeric'

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
        <TouchableOpacity style={style.touchableButton} onPress={addDataPoint}>
          <Text style={style.touchableButtonText}>Enviar</Text>
        </TouchableOpacity>
        <VictoryChart        
                    theme={VictoryTheme.mateiral} maxDomain={{ y: 100 }} minDomain={{ y: 0 }} responsive={true} scale={{ x: 'time' }}
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
      </ScrollView>
  );

  function calculaTempAgua(tempAgua){
    if(tempAgua > 15){
      qTA = 9;
    }else if (tempAgua < -5){
      qTA = 1;
    } else{
     qTA = 92*Math.exp(-(((tempAgua-0**2)/2)*(0.25**2)))
    }
    return qTA ** 0.1;
  };

  function calcularPH(ph){
    if(ph > 12){
      qPH = 3;
    }else if(ph < 2){
      qPH = 2;
    }else{
      qPH = 93*(Math.exp(-(((ph-7.5)**2)/2)*(0.652**2)))
    }
    return qPH ** 0.12;
  };

  function calcularOD(od){
    if(od >150){
      qOD = 47;
    }else{
      qOD = 100 * Math.exp(-(((od-100)**2)/2)*(0.025**2))
    }
    return qOD ** 0.17;
  };
  
  function calcularDBO(inputDBO){
    if(inputDBO > 30){
      qDBO = 2;
    }else if(inputDBO <=0){
      qDBO = 100;
    }else{
      qDBO = (-30.1) * Math.log(inputDBO) + 103.45;
    }
    return qDBO ** 0.1;
  };
  
  function calcularTurbidez(inputTurbidez){
    if(inputTurbidez > 100){
      qTurbidez = 5;
    }else{
      qTurbidez = (-26.45) * Math.log(inputTurbidez) + 136.39;
    }
    return qTurbidez ** 0.08;
  };
  
  function calcularNitrogenioTotal(inputNitrogênioTotal){
    if (inputNitrogênioTotal > 100){
      qNT = 1;
    }else{
      qNT = (-20.8) * Math.log(inputNitrogênioTotal) + 93.092;
    }
    return qNT**0.1;
  };
  
  function calcularFosforo(fosforoTotal){
    if(fosforoTotal > 10){
      qFT = 1;
    }else{
      qFT = (-15.49)* Math.log(fosforoTotal) + 37.202;
    }
    return qFT**0.1;
  };
  
  function calcularColiformes(coliformesTermoTolerantes){
    if(coliformesTermoTolerantes > 100000){
      qCT = 3;
    }else{
     qCT = -8.723*Math.log(coliformesTermoTolerantes)+88.714;
    }
    return qCT**0.15;
  };
  
  function calcularResiduosTotais(residuosTotais){ 
    if(residuosTotais > 500){
      qRT = 32;
    }else{
      qRT = 80*Math.exp(-(((residuosTotais-50)**2)/2)*(0.003**2))
    }
    return qRT**0.08;
  };

  function calculaIQA(qTA, qPH, qOD, qDBO, qTurbidez, qNT, qFT, qCT, qRT){

    var qTA_C = calculaTempAgua(qTA);
    var qPH_C = calcularPH(qPH);
    var qOD_C = calcularOD(qOD);
    var qDBO_C = calcularDBO(qDBO);
    var qTurbidez_C = calcularTurbidez(qTurbidez);
    var qNT_C = calcularNitrogenioTotal(qNT);
    var qFT_C = calcularFosforo(qFT);
    var qCT_C = calcularColiformes(qCT);
    var qRT_C = calcularResiduosTotais(qRT);

    console.log("qTA_C: ", qTA_C)
    console.log("qPH_C: ", qPH_C)
    console.log("qOD_C: ", qOD_C)
    console.log("qDBO_C: ", qDBO_C)
    console.log("qTurbidez_C: ", qTurbidez_C)
    console.log("qNT_C: ", qNT_C)
    console.log("qFT_C: ", qFT_C)
    console.log("qCT_C: ", qCT_C)
    console.log("qRT_C: ", qRT_C)


    return (qTA_C * qPH_C * qOD_C * qDBO_C * qTurbidez_C * qNT_C * qFT_C * qCT_C * qRT_C);
    
  }
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
