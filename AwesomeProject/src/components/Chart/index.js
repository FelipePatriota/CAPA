import React from "react";
import { View, StyleSheet, Text} from "react-native";
import Legend from "./Legend";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from "victory-native";
import ResetButton from "../Buttons/ResetButton";

export default function Chart(props) {
    
    

    const { resetData } = props;

    const resetChart = () => {
        resetData();
    };

    return (

        <View style = { styles.chartContainer } >
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
                    <ResetButton onPress ={resetChart} />

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    touchableButton: {
        backgroundColor: '#22a0c9',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    touchableButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#34495e',
        borderRadius: 8,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    lockButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
});