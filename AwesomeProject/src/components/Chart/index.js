import React, {useRef} from "react";
import { View, StyleSheet} from "react-native";
import ViewShot from "react-native-view-shot";
import Legend from "./Legend";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import ResetButton from "../Buttons/ResetButton";
import SaveButton from "../Buttons/SaveButton";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { styles } from "./style/style";

export default function Chart(props) {

    const viewShotRef = useRef();

    const saveChartAsImage = async () => {
       
        try {
            const uri = await viewShotRef.current.capture();
            const fileName = `${FileSystem.documentDirectory}chart.png`;
            await FileSystem.moveAsync({
                from: uri,
                to: fileName,
            });
            await Sharing.shareAsync(fileName);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a imagem. Tente novamente.');
        }
    };

    return (
        
        <View style = { styles.chartContainer } >
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
                    <VictoryChart width={400} domainPadding={25} theme={VictoryTheme.material}>
                        <VictoryAxis
                            tickValues={props.years} // Definindo os valores do eixo X como o array "years"
                            tickFormat={(tick) => Math.floor(tick)}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(tick) => tick.toFixed(1)} // Definindo os valores do eixo Y como números inteiros
                        />
                        <VictoryBar
                            data={props.data}
                            barWidth={20}
                            style={{
                                data: {
                                    fill: ({ datum }) => colocarCor(datum.label),
                                },
                                labels: {
                                    display: 'none',
                                },
                            }}
                            x="x"
                            y="y"
                        />
                    </VictoryChart>
                    <Legend/>
            </ViewShot>
                    <ResetButton onPress={props.resetData} />
                    <SaveButton onPress={saveChartAsImage}/>
                </View>

    );
}

function colocarCor(selectedResevoir) {
    if (selectedResevoir == "Tabocas") {
        return '#8c1521';
    }
    else if (selectedResevoir == "Severino\nGuerra") {
        return '#163da8';
    }
    else if (selectedResevoir == "Pedro\nMoura") {
        return '#541782';
    }
}