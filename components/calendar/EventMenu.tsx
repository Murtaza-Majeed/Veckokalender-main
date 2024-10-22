import { Button, Text, TextInput, View } from "react-native";

export function EventMenu({
    setIsMenuOpen,
    daySelect,
    addEvent,
    newEvent,
    setNewEvent,
}: {
    daySelect: any
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addEvent: () => void;
    newEvent: string;
    setNewEvent: React.Dispatch<React.SetStateAction<string>>;
}) {

    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            
            <View
                style={{ width: 350, height: '50%', alignSelf: 'center', borderWidth: 1, backgroundColor: 'white' }}>
                {/* Input för att lägga till ny händelse */}
                <Text>{daySelect.toDateString()}</Text>
                <TextInput
                    placeholder="Lägg till ny händelse"
                    value={newEvent}
                    onChangeText={setNewEvent}
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginVertical: 10,
                        padding: 5,
                    }}
                />
                <Button title="Lägg till händelse" onPress={addEvent} />
                <Button title="Stäng" onPress={() => setIsMenuOpen(false)} />
            </View>

        </View>

    );
};