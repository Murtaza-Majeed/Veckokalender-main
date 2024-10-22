import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DayScreen from "./Screens/DayScreen";
import WeekScreen from "./Screens/WeekScreen";
import MonthScreen from "./Screens/MonthScreen";
import ToDoScreen from "./Screens/ToDoScreen";

const Tab = createBottomTabNavigator();

function AddEventButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Ionicons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
}

export default function Index() {
  const handleAddEvent = () => {
    // Handle add event logic here
    console.log('Add event button pressed');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Day') {
            iconName = 'today-outline';
          } else if (route.name === 'Week') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Month') {
            iconName = 'calendar-outline';
          } else if (route.name === 'ToDo') {
            iconName = 'list-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#0073CC',
        tabBarInactiveTintColor: '#bdc3c7',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Day" component={DayScreen} />
      <Tab.Screen name="Week" component={WeekScreen} />
      <Tab.Screen 
        name="AddEvent" 
        component={DayScreen} // Placeholder component
        options={{
          tabBarButton: (props) => (
            <AddEventButton {...props} onPress={handleAddEvent} />
          ),
        }}
      />
      <Tab.Screen name="Month" component={MonthScreen} />
      <Tab.Screen name="ToDo" component={ToDoScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 60,
    paddingBottom: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0073CC',
    top: -25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});