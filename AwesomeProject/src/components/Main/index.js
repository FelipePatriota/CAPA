import React, { useState }from "react";
import { View, ScrollView} from "react-native";
import Form from "../Form";
import Chart from "../Chart";

export default function SelectionScreen({ navigation }) {
    
    const [years, setYears] = useState([]);
    const [data, setData] = useState([]);
    const [resetButtonPressed, setResetButtonPressed] = useState(false);
    
    const handleData = (newYears, newData) => {
        setYears(newYears);
        setData(newData);
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
            
                <Form onDataChanged={handleData} resetButtonPressed={resetButtonPressed} setResetButtonPressed={setResetButtonPressed}/>
                <Chart 
                years={years}
                data={data}
                resetData={() => setResetButtonPressed(true)}
                />

                
            </View>
        </ScrollView>
    );
}


