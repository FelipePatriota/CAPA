import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
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
    lockButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    dropdown: {
        justifyContent: 'center',
    },
});