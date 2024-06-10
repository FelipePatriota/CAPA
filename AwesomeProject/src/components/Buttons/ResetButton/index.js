import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../style/style";

export default function ResetButton(props) {
    
    
    return (
        <TouchableOpacity
            style={[styles.touchableButton, { borderRadius: 20, marginTop: 10 }]}
            onPress={props.onPress}
        >
            <Text style={styles.touchableButtonText}>Resetar Gráfico</Text>
        </TouchableOpacity>
    );
}
