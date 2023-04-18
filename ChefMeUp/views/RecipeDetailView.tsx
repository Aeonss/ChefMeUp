// RecipeDetailView.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Recipe} from '../model/Recipe';
import {RecipesDetailViewProps} from './RecipeStackParams';
import {RecipeGroceriesView} from './RecipeGroceriesView';
import {RecipesGroceriesViewProps} from './GroceriesStackParams';
import {RecipePricesViewProps} from './RecipeStackParams'

type RecipeDetailViewProps = {
  recipe: Recipe;
};

const RecipeDetailView = ({route, navigation}: RecipesDetailViewProps) => {
  const {recipe} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <ScrollView style={styles.scrollView}>
        <Image source={{uri: recipe.imageUrl}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Total Time:</Text>
          <Text style={styles.info}>{recipe.totalMinutes} minutes</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Estimated Cost:</Text>
          <Text style={styles.info}>${recipe.totalCost}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Quantity:</Text>
          <Text style={styles.info}>{recipe.numberServings} servings</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RecipePricesView', {recipe: recipe})}>
          <Text style={styles.button}>
            Check prices at your local grocery store
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </Text>
        ))}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {/* {recipe.instructions.map(instruction => (
          <Text key={instruction.step} style={styles.listItem}>
            {instruction.step}. {instruction.description}
          </Text>
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 15,
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#5dbb63',
    marginTop: 15,
    padding: 12,
    borderRadius: 22,
    overflow: 'hidden',
    textAlign: 'center',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  scrollView: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RecipeDetailView;
