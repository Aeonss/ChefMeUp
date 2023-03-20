import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, Image} from 'react-native';
import RecipesView from './views/RecipesView';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


const FirstStack = () => (
  <Stack.Navigator>
    {RecipesView()}
  </Stack.Navigator>
);

const SecondStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SecondScreen" component={SecondScreen} />
  </Stack.Navigator>
);

const ThirdStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
  </Stack.Navigator>
);

// Dummy screen components
// const FirstScreen = () => (
//   <Text style={{textAlign: 'center'}}>First Screen</Text>
// );
const SecondScreen = () => (
  <Text style={{textAlign: 'center'}}>Second Screen</Text>
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
          //   activeTintColor: 'white',
          //   inactiveTintColor: '#92c5c2',
          //   backgroundColor: '#075e54',
        }}>
        <Tab.Screen
          name="First"
          component={FirstStack}
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
          component={SecondStack}
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
