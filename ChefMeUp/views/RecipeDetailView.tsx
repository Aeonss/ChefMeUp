// RecipeDetailView.tsx
import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';

import { CheckBox } from 'react-native-elements';

import {Recipe} from '../model/Recipe';
import {RecipesDetailViewProps} from './RecipeStackParams';

type RecipeDetailViewProps = {
  recipe: Recipe;
};

const RecipeDetailView = ({route, navigation}: RecipesDetailViewProps) => {
  const {recipe} = route.params;

  const [checkedIngredients, setCheckedIngredients] = useState(
    new Array(recipe.ingredients.length).fill(false)
  );

  const toggleIngredient = (index: number) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !checkedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  const openUrl = () => {
    const url = recipe.instructions;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
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
          <TouchableOpacity key={index} onPress={() => toggleIngredient(index)}>
            <View style={styles.ingredientContainer}>
              <View style={styles.checkboxContainer}>
                {checkedIngredients[index] && <View style={styles.checkbox} />}
              </View>
              <Text style={styles.ingredientText}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        <TouchableOpacity onPress={openUrl}>
          <Text style={styles.button}>
            View instructions
          </Text>
        </TouchableOpacity>
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
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#007aff',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#007aff',
  },
  ingredientText: {
    fontSize: 16,
    color: '#000',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RecipeDetailView;
