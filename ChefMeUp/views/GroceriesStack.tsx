import {createStackNavigator} from '@react-navigation/stack';
import {GroceriesStackParam} from './GroceriesStackParams';
import RecipeGroceriesView from './RecipeGroceriesView';

const Stack = createStackNavigator<GroceriesStackParam>();

const RecipeGroceriesViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipeGroceriesView"
      component={RecipeGroceriesView}
      options={{title: 'Groceries'}}
    />
  );
};

const GroceriesStack = () => (
  <Stack.Navigator>
    {RecipeGroceriesViewWrapper()}
  </Stack.Navigator>
);

export default GroceriesStack
