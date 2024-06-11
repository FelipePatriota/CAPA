import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../style/style";

export default function AddButton(props) {


    return (
        <TouchableOpacity
            style={[styles.touchableButton, { borderRadius: 20 }]}
            onPress={props.onPress}
        >
            <Text style={styles.touchableButtonText}>Adicionar</Text>
        </TouchableOpacity>
    );
}
