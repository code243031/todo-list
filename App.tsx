import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as dotenv from 'dotenv'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo } from "@expo/vector-icons";

import Home from './screens/home';
import Write from './screens/write';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: "TO-DO-List",
            tabBarIcon: () => {
              return <Entypo name="list" />
            }
          }}
        />
        <Tab.Screen
          name="Write"
          component={Write}
          options={{
            title: "Create TO-DO",
            tabBarIcon: () => {
              return <Entypo name="add-to-list" />
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>    
  );
}

