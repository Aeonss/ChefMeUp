import React from 'react';
import { SortBy } from 'react-instantsearch-dom';
import {
  Button,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Dropdown } from 'react-native-material-dropdown';
import {Recipe} from '../model/Recipe';
import sampleRecipes from '../model/sampleRecipes';
import {useState} from 'react';
import {RecipesViewProps} from './RecipeStackParams';
import Network from '../network/network';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
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
            {recipe.totalMinutes} min •
            {formatter.format(recipe.totalCost / recipe.numberServings)}/serving
          </Text>
        </View>
      </ImageBackground>
    </View>
  </TouchableOpacity>
);

const SearchBox = (
  updateSearch: (_: string) => void,
  search: string,
  performSearch: () => void,
) => (
  <View style={styles.searchBar}>
    <TextInput
      onChangeText={updateSearch}
      value={search}
      placeholder="Search for a recipe..."
      placeholderTextColor="#555"
      style={styles.searchInput}
      returnKeyType="search"
      onSubmitEditing={performSearch}></TextInput>
    <TouchableOpacity onPress={performSearch} style={styles.searchIcon}>
      <Image
        source={require('../assets/bxs-search.png')}
        style={{tintColor: '#fff', width: 32, height: 32}}
      />
    </TouchableOpacity>
  </View>
);

const RecipesView = ({route, navigation}: RecipesViewProps) => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState('Search for a recipe to get started!');
  const updateSearch = (text: string): void => {
    setSearch(text);
  };
  const [selectedFilter, setSelectedFilter] = useState();
  const dropDownData = [
      { value: 'Option 1' },
      { value: 'Option 2' },
      { value: 'Option 3' },
      // Add more options as needed
    ];
  const sortResults = (filter) => {
      if(filter=="time")
      {
        console.log("time");
        console.log("price")
        recipes.sort((obj1, obj2) => {
            return obj1.totalMinutes - obj2.totalMinutes;
          });

          setRecipes([...recipes]); // update
      } else if(filter == "price")
      {
        console.log("price")
        recipes.sort((obj1, obj2) => {
            return obj1.totalCost - obj2.totalCost;
          });

          setRecipes([...recipes]); // update
      } else {
        console.log("relevance")
      }
    };
  const sortListASC = () => {

    };

    const sortListDES = () => {
      recipes.sort((obj1, obj2) => {
        return obj2.id - obj1.id;
      });
      setRecipes([...recipes]);
    };
  function getOnClick(recipe: Recipe) {
    return () => {
      navigation.navigate('RecipeDetailView', {recipe: recipe});
    };
  }
  async function performSearch() {
    if (search.length == 0) {
      setMessage('Search for a recipe to get started!');
      setRecipes([]);
      return;
    }
    Keyboard.dismiss();
    setIsSearching(true);
    setRecipes([]);
    setMessage('');
    Network.fetchRecipes(search)
      .then(fetched => {
        setIsSearching(false);
        setRecipes(fetched);
        if (fetched.length == 0) {
          setMessage(
            'Could not find any recipes. Please try searching using a different query.',
          );
        }
      })
      .catch(error => {
        setIsSearching(false);
        setMessage(`There was an error when searching for recipes: ${error}`);
      });
  }
  return (
    <View style={styles.view}>
      {SearchBox(updateSearch, search, performSearch)}
      {isSearching && <ActivityIndicator />}
      {message.length > 0 && <Text style={styles.message}>{message}</Text>}
      {recipes.length > 0 && (
        <View style={styles.view}>
            <View>
                <Text style={styles.sortLabel}>Sort By:</Text>
                <Picker
                  selectedValue={selectedFilter}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedFilter(itemValue)
                    sortResults(itemValue)
                    }
                  }>
                  <Picker.Item label="Relevance" value="relevance" />
                  <Picker.Item label="Time" value="time" />
                  <Picker.Item label="Price" value="price" />
                </Picker>
            </View>
            <FlatList
              data={recipes}
              renderItem={({item}) => RecipeCard(item, getOnClick(item))}
              keyExtractor={item => item.id.toString()}
            />
        </View>
      )}
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
      fontSize: 16
    },
  view: {
    height: '100%',
  },
});

export default RecipesView;
