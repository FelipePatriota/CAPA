import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";

export default function ModalComponent(props){
    
    const { 
        type,
        data,
        modalVisible,
        setModalVisible,
        setSelectedElement,
        setSelectedReservoir,
        setSelectedYear,
        setElementDisabled
        } = props;

    
    const selectItem = (type, value) => {
        if (type === 'element') {
            setSelectedElement(value);
            setElementDisabled(true);
        } else if (type === 'year') {
            setSelectedYear(value);
        } else if (type === 'reservoir') {
            setSelectedReservoir(value);
        }
        closeModal(type);
    };

    const closeModal = (type) => {
        setModalVisible({ ...modalVisible, [type]: false });
    };

    return   (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible[type]}
            onRequestClose={() => closeModal(type)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => selectItem(type, item)}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => closeModal(type)}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
    dropdown: {
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#22a0c9',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});