import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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