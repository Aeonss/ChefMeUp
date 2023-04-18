import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Image} from 'react-native';
import RecipeStack from './views/RecipesStack';
import GroceriesStack from './views/GroceriesStack';

const Tab = createMaterialBottomTabNavigator();


const ThirdStack = () => (
    <Text>Hello</Text>
);
const ThirdScreen = () => (
  <Text style={{textAlign: 'center'}}>Third Screen</Text>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="First"
        shifting={false}
        sceneAnimationEnabled={false}
        activeColor="black"
        inactiveColor="#888"
        barStyle={{
          backgroundColor: 'white',
        }}
        theme={{colors:{secondaryContainer: 'transparent'}}}
        screenOptions={{
          tabBarColor: 'black',
        }}>

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
          component={ThirdStack}
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
