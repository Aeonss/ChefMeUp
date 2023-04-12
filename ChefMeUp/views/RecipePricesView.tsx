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
import {RecipePricesViewProps} from './RecipeStackParams';
import {GroceryStore} from '../model/GroceryStore';

// Usable stuff
// Grocery store has name, logoUrl, distance, address
// Recipe has 'ingredients' which is Ingredient[]
// Ingredient has name, amount, imageUrl, and unit

const RecipePricesView = ({route, navigation}: RecipeGroceriesViewProps) => {
    const {recipe} = route.params;
  return (

    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{recipe.name}</Text>
        <ScrollView style={styles.scrollView}>
          <Image source={{uri: recipe.imageUrl}} style={styles.image} />
          <View style={styles.infoContainer}>
                          <Text style={styles.info}>Grocery Stores Near You</Text>
                       </View>

        </ScrollView>

        <ScrollView style={styles.scrollView}>


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

export default RecipePricesView;
