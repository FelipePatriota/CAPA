import React, { useState }from "react";
import { View, ScrollView} from "react-native";
import Form from "../Form";
import Chart from "../Chart";

export default function SelectionScreen({ navigation }) {
    
    const [years, setYears] = useState([]);
    const [data, setData] = useState([]);
    
    const handleData = (newYears, newData) => {
        setYears(newYears);
        setData(newData);
    }

    const resetData = () => {
        setData([]);
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
            
                <Form  onDataChanged ={handleData}/>
                <Chart 
                years={years}
                data={data}
                resetData={resetData}
                />

                
            </View>
        </ScrollView>
    );
}


