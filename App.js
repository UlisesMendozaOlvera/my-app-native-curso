import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FoldersScreen from './src/screens/FoldersScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ImageViewer from './src/screens/ImageViewer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Folders"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6ADD68',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Folders"
          component={FoldersScreen}
          options={{ title: 'Mis Carpetas' }}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={({ route }) => ({ title: route.params.folder })}
        />
        <Stack.Screen
          name="ImageViewer"
          component={ImageViewer}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
