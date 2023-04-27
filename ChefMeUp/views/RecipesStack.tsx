import {createStackNavigator} from '@react-navigation/stack';
import RecipeDetailView from './RecipeDetailView';
import {RecipeStackParam} from './RecipeStackParams';
import RecipesView from './RecipesView';
import RecipePricesView from './RecipePricesView'

const Stack = createStackNavigator<RecipeStackParam>();


const RecipesViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipesView"
      component={RecipesView}
      options={{title: 'Recipes'}}
    />
  );
};

const RecipeDetailViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipeDetailView"
      component={RecipeDetailView}
      options={{title: ''}}
    />
  );
};

const RecipePricesViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipePricesView"
      component={RecipePricesView}
      options={{title: 'Grocery Prices'}}
    />
  );
};

const RecipesStack = () => (
  <Stack.Navigator>
    {RecipesViewWrapper()}
    {RecipeDetailViewWrapper()}
    {RecipePricesViewWrapper()}
  </Stack.Navigator>
);

export default RecipesStack
