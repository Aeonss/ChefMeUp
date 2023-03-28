import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Recipe} from '../model/Recipe';
import sampleRecipes from '../model/sampleRecipes';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {RecipesViewProps} from './RecipeStackParams';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const RecipeCard = (recipe: Recipe, onClick: () => void) => (
  <TouchableOpacity onPress={onClick}>
    <View style={styles.recipeCard}>
      <ImageBackground
        source={{uri: recipe.imageUrl}}
        style={styles.recipeImage}>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeDetails}>
            {recipe.totalMinutes} min • $
            {formatter.format(recipe.totalCost / recipe.numberServings)}/serving
          </Text>
        </View>
      </ImageBackground>
    </View>
  </TouchableOpacity>
);

const RecipesView = ({route, navigation}: RecipesViewProps) => {
  const [search, setSearch] = useState('');
  const updateSearch = (text: string): void => {
    setSearch(text);
  };
  function getOnClick(recipe: Recipe) {
    return () => {
      navigation.navigate('RecipeDetailView', {recipe: recipe});
    };
  }
  return (
    <View style={styles.view}>
      <TextInput
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        onChangeText={updateSearch}
        value={search}
        placeholder="Search for a recipe..."
        style={styles.searchBar}></TextInput>
      <FlatList
        data={sampleRecipes}
        renderItem={({item}) => RecipeCard(item, getOnClick(item))}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    margin: 16,
    marginTop: 0,
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
    marginBottom: 16,
  },
  view: {
    height: '100%'
  }
});

export default RecipesView;
