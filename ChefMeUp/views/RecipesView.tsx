import React from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import {Recipe} from '../model/Recipe';
import sampleRecipes from '../model/sampleRecipes';
import {createStackNavigator} from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';

const Stack = createStackNavigator();

const RecipeCard = (recipe: Recipe) => (
  <View style={styles.recipeCard}>
    <ImageBackground source={{uri: recipe.imageUrl}} style={styles.recipeImage}>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.recipeDetails}>
          {recipe.totalMinutes} min • $
          {recipe.totalCost / recipe.numberServings}/serving
        </Text>
      </View>
    </ImageBackground>
  </View>
);

const RecipesView = () => {
    const [search, setSearch] = useState('');
    const updateSearch = (text: string): void => {
        setSearch(text);
    }
  return (
    <View>
      {/* <SearchBar placeholder='Search for a recipe...' onChangeText={updateSearch} value={search} lightTheme round /> */}
      <TextInput underlineColor='transparent' onChangeText={updateSearch} value={search} placeholder="Search for a recipe..." style={styles.searchBar}></TextInput>
      <FlatList
        data={sampleRecipes}
        renderItem={({item}) => RecipeCard(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const RecipesViewWrapper = () => {
  return (
    <Stack.Screen
      name="Saved Recipes"
      component={RecipesView}
      options={{title: 'Saved Recipes'}}
    />
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  recipeInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  recipeDetails: {
    fontSize: 14,
    color: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    margin: 16,
    height: 50,
    borderWidth: 0,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 0
  }
});

export default RecipesViewWrapper;
