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
  } from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecipeGroceriesViewProps} from './GroceriesStackParams';

const RecipeGroceriesView = ({route, navigation}: RecipeGroceriesViewProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredient, setIngredient] = useState('');
    const [initialFetch, setInitialFetch] = useState(false);

  const saveIngredient = async () => {
    Keyboard.dismiss();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('@INGREDIENT', ingredient);
    } catch (e) {
      console.log('Error saving ingredient: ', e);
    }
    setIsLoading(false);
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
          setIngredient(value);
        }
      } catch (e) {
        console.log('Error fetching ingredient: ', e);
      }
      setIsLoading(false);
    };
    fetchIngredient();
  });

  return (
    <View style={styles.view}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={setIngredient}
          value={ingredient}
          placeholder="search for an ingredient..."
          placeholderTextColor="#8f8c8c"
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={saveIngredient}></TextInput>
        <TouchableOpacity onPress={saveIngredient} style={styles.searchIcon}>
          <Image
            source={require('../assets/bxs-search.png')}
            style={{tintColor: '#fff', width: 32, height: 32}}
          />
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator />}
    </View>
    );
};

const styles = StyleSheet.create({
  message: {
    margin: 32,
    fontSize: 16,
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
  },
});

export default RecipeGroceriesView;
