import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import LogIn from '../screens/LogIn';
import CreateAccount from '../screens/CreateAccount';
import { CREATE_ACCOUNT, LOG_IN, WELCOME } from '../constants';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './ShardStackNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: 'black',
          borderTopColor: 'rgba(255,255,255, 0.3)',
        },
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName={'home'} />}
      </Tabs.Screen>
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'search'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName={'search'} />}
      </Tabs.Screen>
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName={'profile'} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
