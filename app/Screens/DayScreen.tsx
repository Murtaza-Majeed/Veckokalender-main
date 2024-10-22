import moment from "moment";
import { useState } from "react";
import { Alert, Button, Modal, ScrollView, Text, TextInput, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip"
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-gesture-handler';
import { EventMenu } from "@/components/calendar/EventMenu";
import DateTimePicker from "react-native-modal-datetime-picker";





export default function DayScreen({ navigation }: any) {

    const currentDate = new Date();
    // Outputs "Mon Aug 31 2020"
    const [daySelect, setDaySelect] = useState(currentDate);
    const [events, setEvents] = useState<{ [key: string]: string[] }>({});
    const [newEvent, setNewEvent] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    // Funktion för att lägga till en händelse för valt datum
    const addEvent = () => {
        const formattedDate = daySelect.toDateString(); // Formaterar datum som nyckel
        if (!newEvent.trim()) {
            Alert.alert('Fel', 'Händelsen kan inte vara tom.');
            return; // Kontroll för att inte lägga till tomma händelser
        }
        // Uppdatera händelser för valt datum
        setEvents((prevEvents) => ({
            ...prevEvents,
            [formattedDate]: [...(prevEvents[formattedDate] || []), newEvent], // Lägg till ny händelse
        }));
        setNewEvent(''); // Nollställ händelsefältet
    };

    // Renderar händelser för valt datum
    const renderEvents = () => {
        const formattedDate = daySelect.toDateString(); // Samma format för att jämföra
        const dayEvents = events[formattedDate] || []; // Hämta händelser för valt datum, tom array om inga finns
        if (dayEvents.length === 0) {
            return <Text>Inga händelser för detta datum.</Text>;
        }
        return (
            <FlatList
                data={dayEvents}
                keyExtractor={(item, index) => `${item}-${index}`} // Säkerställer unika nycklar
                renderItem={({ item }) => 
                <View style={{width: '90%', height: 44, backgroundColor: 'blue', borderWidth: 1, marginVertical: 5}}>
                <Text>{item}</Text>
                </View>}// Visar varje händelse
                
                />
        );
    };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{
                height: '10%',
                backgroundColor: 'blue'
            }}>
                <Text>Current day:</Text>
                <Text>{daySelect.toDateString()} </Text>
            </View>
            <CalendarStrip
                // startingDate={moment()}
                onDateSelected={(date) => setDaySelect(date.toDate())}  // Uppdatera med det valda datumet
                selectedDate={daySelect}  // Markera det valda datumet istället för currentDate

                style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 2, borderHighlightColor: 'green' }}
                calendarColor={'#f0f0f0'}
                dateNumberStyle={{ color: '#000000' }}
                dateNameStyle={{ color: '#000000' }}
                highlightDateNumberStyle={{ color: 'green' }}
                highlightDateNameStyle={{ color: 'green' }}
                disabledDateNameStyle={{ color: 'red' }}
                disabledDateNumberStyle={{ color: 'red' }}
                innerStyle={{}}
                showMonth={false}

                iconContainer={{ flex: 0.1 }}


            ></CalendarStrip>
            <ScrollView>

            <Text>Valt datum: {daySelect.toDateString()}</Text>

            {/* Händelser för valt datum */}
            <Text>Händelser för {daySelect.toDateString()}:</Text>
            {renderEvents()}
            </ScrollView>
            {/* Visa valt datum */}




            <Modal
                animationType="slide"
                transparent={true}
                visible={isMenuOpen}
                onRequestClose={() => setIsMenuOpen(false)} // Stänger menyn när användaren trycker på back-knappen
            >
                <EventMenu daySelect={daySelect} setIsMenuOpen={setIsMenuOpen} addEvent={addEvent} newEvent={newEvent} setNewEvent={setNewEvent} />
            </Modal>

            <Button title="Add event" onPress={() => { setIsMenuOpen(!isMenuOpen) }}></Button>

        </GestureHandlerRootView>


    );
}

