import React, {useEffect, useState} from 'react';
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
import {ActivityIndicator} from 'react-native-paper';
import Network from '../network/network';
import {PurchaseOption} from '../model/PurchaseOption';

// Usable stuff
// Grocery store has name, logoUrl, distance, address
// Recipe has 'ingredients' which is Ingredient[]
// Ingredient has name, amount, imageUrl, and unit

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const PurchaseOptionCell = (option: PurchaseOption) => {
  return (
    <View style={styles.purchaseOptionCell}>
      <Text>{option.storeId}</Text>
      <Text>{formatter.format(option.price)}</Text>
    </View>
  );
};

const RecipePricesView = ({route, navigation}: RecipePricesViewProps) => {
  const {recipe} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState<PurchaseOption[]>([]);
  const [performedFetch, setPerformedFetch] = useState(false);
  useEffect(() => {
    if (performedFetch) {
      return;
    }
    setPerformedFetch(true);
    Network.fetchPrice(recipe)
      .then(prices => {
        setPrices(prices);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`Error fetching prices: ${e}`);
      });
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <ScrollView style={styles.scrollView}>
        <Image source={{uri: recipe.imageUrl}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Grocery Stores Near You</Text>
        </View>
        {isLoading && <ActivityIndicator style={styles.loader} />}
        {prices.map(price => PurchaseOptionCell(price))}
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
    marginBottom: 16
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
  loader: {
    margin: 32,
  },
  purchaseOptionCell: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
  },
});

export default RecipePricesView;
