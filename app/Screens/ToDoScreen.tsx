import { useState } from "react";
import { Button, FlatList, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";


class Taskdata{
    id: string = "";
    text: string = "";
    title: string = "";
}

export default function ToDoScreen({ navigation }: any) {


    

    const [isInputVisable, setInputVisable] = useState(false); // Används i funktionen addTaskPress

    const [task, setTask] = useState("");                      // UseState variable för task, använders input

    const [tasklist, setTasklist] = useState<Taskdata[]>([]);  // Använder sig av class Taskdata som sedan applicerar använderns input i en flatlist

    const [tasktitle, setTasktitle] = useState("");            // Använders title input


    function addTaskPress() {
        setInputVisable(!isInputVisable); // Avgör om knappen ska visa "Add" eller "Cancel"
    }


    function addTask() {
        const createid = Date.now();

        if (tasktitle.trim()) {    // Om använderen skriver in onödig "whitespace" eller textfält om whitespaces så tar trim hand om det.
            
            setTasklist([...tasklist, { id: createid.toString(), text: task, title: tasktitle }]); // Gör en kopia av listan och lägger till använders input
            
            setTask("");      // Reset textfältet för task
            
            setTasktitle(""); // Reset textfältet för title
            
            setInputVisable(false); // Om isInputVisable är true, så visar knappen "Cancel", false = "Add"
        }
    };


    // Tar bort en task baserat på id
    function deleteTask(id : string) {
        setTasklist((prevData) => prevData.filter((item) => item.id != id ));
    }

    // Funktion som ger alternativ att ta bort en task
    function rightActions(id : string) {
        return (
            <TouchableOpacity onPress={() => deleteTask(id)}>
                <View style={{backgroundColor: "red", flex: 1, width: 100, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color:"white"}}>Delete</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // Applicerar en swipe funktion på flatlistens tasks
    function renderTasklist({item} : {item: Taskdata}) {
        return (
            <Swipeable renderRightActions={() => rightActions(item.id)}>
                <View style={{borderWidth: 0.2}}>
                    <Text style={{fontSize: 24, paddingLeft: 10, marginBottom: 8}}>{item.title}</Text>
                    <Text style={{paddingLeft: 10}}>{item.text}{"\n"}</Text>
                </View>
            </Swipeable>
        );
    }

    



    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{flex: 1}}>
                
                <Button
                    title={isInputVisable ? "Cancel" : "Add"}
                    onPress={addTaskPress}
                /> 

                {isInputVisable && (
                    <View>
                        <View style={{borderWidth: 0.2, borderRadius: 15}}>
                            <TextInput 
                                style={{padding: 5, margin: 5, fontSize: 18}}
                                placeholder="Title"
                                value={tasktitle}
                                onChangeText={(titletext) => setTasktitle(titletext)} />
                            <TextInput
                                style={{padding: 5, margin: 5 }}
                                placeholder="Enter task"
                                value={task}
                                onChangeText={(text) => setTask(text)} />

                        </View>

                        <Button
                            title="Done"
                            onPress={addTask}/>
                    </View>
                )}

                
                <FlatList 
                    data={tasklist}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTasklist}
                />

            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
