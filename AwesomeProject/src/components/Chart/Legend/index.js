import React from "react";
import { View,Text } from "react-native";
import { styles } from "./style/style";
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

export default function Legend() {
    return (
        <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colocarCor('Tabocas') }]} />
                <Text>Tabocas</Text>
            </View>
            <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colocarCor('Severino\nGuerra') }]} />
                <Text>Severino Guerra</Text>
            </View>
            <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colocarCor('Pedro\nMoura') }]} />
                <Text>Pedro Moura</Text>
            </View>
        </View>
    );
};
