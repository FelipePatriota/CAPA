import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { styles } from "./style/style";

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