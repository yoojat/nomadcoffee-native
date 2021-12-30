import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Photo from '../screens/Photo';
import Profile from '../screens/Profile';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import { Image } from 'react-native';
import Login from '../screens/LogIn';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import Likes from '../screens/Likes';

const Stack = createNativeStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      headerMode='screen'
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          borderBottomColor: 'rgba(255, 255, 255, 0.3)',
          shadowColor: 'rgba(255,255,255,0.3)', // 적용 안됨
          backgroundColor: 'black',
        },
      }}
    >
      {screenName === 'home' ? (
        <Stack.Screen
          name={'Feed'}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode='contain'
                source={require('../assets/logo.png')}
              />
            ),
          }}
        />
      ) : null}
      {screenName === 'search' ? (
        <Stack.Screen name='Search' component={Search} />
      ) : null}
      {screenName === 'profile' ? (
        isLoggedInVar() ? (
          <Stack.Screen name='Me' component={Me} />
        ) : (
          <Stack.Screen name={'LogIn'} component={Login} />
        )
      ) : null}
    </Stack.Navigator>
  );
}
