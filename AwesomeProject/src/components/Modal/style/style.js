// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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