import {createStackNavigator} from '@react-navigation/stack';
import RecipeDetailView from './RecipeDetailView';
import {RecipeStackParam} from './RecipeStackParams';

const Stack = createStackNavigator<RecipeStackParam>();

import RecipesView from './RecipesView';

const RecipesViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipesView"
      component={RecipesView}
      options={{title: 'Saved Recipes'}}
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

const RecipesStack = () => (
  <Stack.Navigator>
    {RecipesViewWrapper()}
    {RecipeDetailViewWrapper()}
  </Stack.Navigator>
);

export default RecipesStack
