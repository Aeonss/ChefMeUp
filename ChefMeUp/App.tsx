import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import RecipeStack from './views/RecipesStack';
import GroceriesStack from './views/GroceriesStack';
import SettingsView from './views/SettingsView';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {LogBox} from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="First"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#5dbb63',
          tabBarLabelStyle: {
            fontFamily: 'Poppins',
            fontWeight: '600',
          },
          tabBarInactiveBackgroundColor: 'white',
        }}
        // shifting={false}
        // sceneAnimationEnabled={false}
        // activeColor="black"
        // inactiveColor="#888"

        // barStyle={{
        //   backgroundColor: 'white',
        // }}
        // theme={{colors:{secondaryContainer: 'transparent'}}}
        // screenOptions={{
        //   tabBarColor: 'black',
        // }}
      >
        <Tab.Screen
          name="First"
          component={RecipeStack}
          options={{
            tabBarLabel: 'Recipes',
            tabBarIcon: ({color, focused}) => (
              <Image
                source={require('./assets/bxs-home.png')}
                style={{tintColor: color, width: 24, height: 24}}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Second"
          component={GroceriesStack}
          options={{
            tabBarLabel: 'Groceries',
            tabBarIcon: ({color, focused}) => (
              <Image
                source={require('./assets/bxs-food-menu.png')}
                style={{tintColor: color, width: 24, height: 24}}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Third"
          component={SettingsView}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, focused}) => (
              <Image
                source={require('./assets/bxs-cog.png')}
                style={{tintColor: color, width: 24, height: 24}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
