import React from 'react';
import {Text, View} from 'react-native';
import {RecipeGroceriesViewProps} from './GroceriesStackParams';

const RecipeGroceriesView = ({route, navigation}: RecipeGroceriesViewProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is the recipe groceries screen</Text>
    </View>
  );
};

export default RecipeGroceriesView;
