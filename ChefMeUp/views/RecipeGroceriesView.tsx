import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecipesGroceriesViewProps} from './GroceriesStackParams';

const RecipeGroceriesView = ({
  route,
  navigation,
}: RecipesGroceriesViewProps) => {
  navigation.setOptions({
    headerTitleStyle: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: 'black',
    },
    headerBackTitle: ' ',
    headerTintColor: '#5dbb63',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);

  const saveIngredient = async () => {
    Keyboard.dismiss();
    if (isLoading) return;
    setIsLoading(true);
    ingredients.push(input);
    try {
      await AsyncStorage.setItem('@INGREDIENT', ingredients.join(';'));
    } catch (e) {
      console.log('Error saving ingredient: ', e);
    }
    setIsLoading(false);
    setIngredients(ingredients);
    setInput('');
  };
  useEffect(() => {
    if (initialFetch) {
      return;
    }
    setInitialFetch(true);
    const fetchIngredient = async () => {
      try {
        const value = await AsyncStorage.getItem('@INGREDIENT');
        if (value !== null) {
          setIngredients(value.split(';'));
        }
      } catch (e) {
        console.log('Error fetching ingredient: ', e);
      }
      setIsLoading(false);
    };
    fetchIngredient();
  });

  const onChangeText = (text: string) => {
    setInput(text);
  };

  const deleteIngredient = async (ingredient: string) => {
    Keyboard.dismiss();
    if (isLoading) return;
    setIsLoading(true);
    setIngredients(ingredients.filter(a => a != ingredient));
    try {
      await AsyncStorage.setItem('@INGREDIENT', ingredients.join(';'));
    } catch (e) {
      console.log('Error saving ingredient: ', e);
    }
    setIsLoading(false);
    setInput('');
  };

  return (
    <View style={styles.view}>
      <Text style={styles.header}>Add ingredients to check their prices:</Text>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={onChangeText}
          value={input}
          placeholder="search for an ingredient..."
          placeholderTextColor="#8f8c8c"
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={saveIngredient}></TextInput>
        <TouchableOpacity onPress={saveIngredient} style={styles.searchIcon}>
          <Image
            source={require('../assets/bxs-plus.png')}
            style={{tintColor: '#fff', width: 32, height: 32}}
          />
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator />}
      <ScrollView>
        {ingredients.map((ingredient, index) => {
          return (
            <View style={styles.ingredientContainer} key={index}>
              <Text style={styles.ingredientName}>{ingredient}</Text>
              <TouchableOpacity
                onPress={() => {deleteIngredient(ingredient)}}
                key={index}
                style={styles.removeButton}>
                <Image source={require('../assets/bxs-minus.png')} style={styles.removeButtonImage} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
            onPress={() => {
              navigation.navigate('RecipePricesView', {
                selectedIngredients: ingredients
              });
            }}
            disabled={ingredients.length == 0}
            style={{
              opacity: ingredients.length == 0 ? 0.4 : 1,
            }}>
            <Text style={styles.button}>
              Check prices at your local grocery store
            </Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  searchBar: {
    margin: 16,
    height: 50,
    borderWidth: 0,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: '#5dbb63',
    borderWidth: 2,
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
  },
  searchIcon: {
    paddingHorizontal: 8,
    paddingRight: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5dbb63',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  sortLabel: {
    margin: 10,
    fontSize: 16,
  },
  view: {
    height: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  ingredientContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8
  },
  ingredientName: {
    fontFamily: 'Poppins-medium',
  },
  removeButton: {
    // width: 28,
    // height: 28,
    // borderRadius: 14,
    // backgroundColor: '#333'
  },
  removeButtonImage: {
    width: 28,
    height: 28
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#5dbb63',
    marginTop: 8,
    padding: 12,
    borderRadius: 22,
    overflow: 'hidden',
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 24,
    marginHorizontal: 16,
  },
});

export default RecipeGroceriesView;
