import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import CreateNote from './screens/CreateNote';
import EditNote from './screens/EditNote';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

