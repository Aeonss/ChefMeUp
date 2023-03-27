// RecipeDetailView.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { Recipe } from '../model/Recipe';

type RecipeDetailViewProps = {
  recipe: Recipe;
};

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({recipe}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Image source={{uri: recipe.imageUrl}} style={styles.image} />
      <Text style={styles.info}>
        Total Time: {recipe.totalMinutes} | Total Cost: {recipe.totalCost} |{' '}
        Servings: {recipe.numberServings}
      </Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            {ingredient.amount} {ingredient.name}
          </Text>
        ))}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map(instruction => (
          <Text key={instruction.step} style={styles.listItem}>
            Step {instruction.step}: {instruction.description}
          </Text>
        ))}
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
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
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
