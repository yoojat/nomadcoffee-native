import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from './styles.d';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, {
  isLoggedInVar,
  logUserIn,
  logUserOut,
  tokenVar,
} from './apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoggedInNav from './navigators/LoggedInNav';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarMode] = useState(
    Appearance.getColorScheme() === 'dark'
  );

  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require('./assets/logo.png')];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  Appearance.addChangeListener(({ colorScheme }) => {
    if (colorScheme === 'dark') {
      setIsDarMode(true);
    } else {
      setIsDarMode(false);
    }
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer>
          <LoggedOutNav />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
