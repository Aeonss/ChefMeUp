import {createStackNavigator} from '@react-navigation/stack';
import {GroceriesStackParam} from './GroceriesStackParams';
import RecipeGroceriesView from './RecipeGroceriesView';
import RecipePricesView from './RecipePricesView';

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

const PricesViewWrapper = () => {
    return (
      <Stack.Screen
        name="RecipePricesView"
        component={RecipePricesView}
        options={{title: 'Prices'}}
      />
    );
  };

const GroceriesStack = () => (
  <Stack.Navigator>
    {RecipeGroceriesViewWrapper()}
    {PricesViewWrapper()}
  </Stack.Navigator>
);

export default GroceriesStack
