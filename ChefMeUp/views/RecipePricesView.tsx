import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {RecipePricesViewProps} from './RecipeStackParams';
import {ActivityIndicator} from 'react-native-paper';
import Network from '../network/network';
import {PurchaseOption} from '../model/PurchaseOption';
import { GroceryPricesViewProps } from './GroceriesStackParams';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const fullName = (name: string) => {
  if (name.includes('HART')) {
    return 'Harris Teeter';
  } else if (name.includes('Lidl')) {
    return 'Lidl';
  } else if (name.includes('KROGER')) {
    return 'Kroger';
  } else {
    return name;
  }
};

const PurchaseOptionCell = (option: PurchaseOption) => {
  return (
    <View style={styles.purchaseOptionCell} key={option.store.id}>
      <Image style={styles.storeImage} source={{uri: option.store.logoUrl}} />
      <View>
        <Text style={styles.storeName}>{fullName(option.store.name)}</Text>
        <Text style={styles.storeAddress}>{option.store.address}</Text>
      </View>
      <View style={styles.spacer}></View>
      <Text style={styles.storePrice}>{formatter.format(option.price)}</Text>
    </View>
  );
};

const RecipePricesView = ({route, navigation}: RecipePricesViewProps|GroceryPricesViewProps) => {
    navigation.setOptions({
        headerTitleStyle: {
          fontFamily: 'Poppins',
          fontWeight: '400',
          color: 'black'
        },
        headerBackTitle: ' ',
        headerTintColor: '#5dbb63',
      });
  const {selectedIngredients} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState<PurchaseOption[]>([]);
  const [performedFetch, setPerformedFetch] = useState(false);
  useEffect(() => {
    if (performedFetch) {
      return;
    }
    setPerformedFetch(true);
    Network.fetchPrices(selectedIngredients)
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
      <ScrollView style={styles.scrollView}>
        {/* {recipe != undefined && <Text style={styles.title}>{recipe.name}</Text>}
        {recipe != undefined && (
          <Image source={{uri: recipe.imageUrl}} style={styles.image} />
        )} */}
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Checking prices for:</Text>
        </View>
        <Text style={styles.ingredient}>{selectedIngredients.map(a => "• " + a).join("\n")}</Text>
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
    fontFamily: 'Poppins',
    marginHorizontal: 16,
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
    textAlign: 'left',
    marginTop: 10,
    fontFamily: 'Poppins-semibold',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 16,
  },
  scrollView: {
    margin: 10,
  },
  loader: {
    margin: 32,
  },
  purchaseOptionCell: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    minWidth: 0,
  },
  storeImage: {
    height: 50,
    width: 50,
    marginRight: 8,
  },
  spacer: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Poppins-semibold',
  },
  storeAddress: {
    fontSize: 10,
    fontFamily: 'Poppins',
    maxWidth: '80%',
  },
  storePrice: {
    fontFamily: 'Poppins-medium',
  },
  ingredient: {
    fontFamily: 'Poppins',
    textTransform: 'capitalize'
  }
});

export default RecipePricesView;
