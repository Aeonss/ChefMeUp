import React, {useEffect, useRef} from 'react';
// import { SortBy } from 'react-instantsearch-dom';
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
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Recipe,
  allCuisines,
  allDietLabels,
  allHealthLabels,
} from '../model/Recipe';
import {useState} from 'react';
import {RecipesViewProps} from './RecipeStackParams';
import Network from '../network/network';
import SelectDropdown from 'react-native-select-dropdown';

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
          <Text style={styles.cuisineType}>
            {recipe.cuisineType} • {recipe.dietLabels.join(', ')}
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
      placeholderTextColor="#8f8c8c"
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
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDietLabels, setSelectedDietLabels] = useState<string[]>([]);
  const [selectedHealthLabels, setSelectedHealthLabels] = useState<string[]>(
    [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<SelectDropdown>(null);
  const updateSearch = (text: string): void => {
    setSearch(text);
  };
  const openFilters = () => {
    setModalOpen(true);
  };
  const closeFilters = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openFilters}>
          <Image
            source={require('../assets/bxs-filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
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
    Network.fetchRecipes(
      search,
      selectedCuisine,
      selectedDietLabels,
      selectedHealthLabels,
    )
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
  const cuisineFilter = (
    <SelectDropdown
      data={allCuisines}
      ref={dropdownRef}
      defaultButtonText={
        selectedCuisine.length == 0 ? 'Select...' : selectedCuisine
      }
      onSelect={(item, index) => {
        if (selectedCuisine == item) {
          setSelectedCuisine('');
          dropdownRef.current?.reset();
        } else {
          setSelectedCuisine(item);
        }
      }}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      buttonTextAfterSelection={(item, index) => {
        return selectedCuisine.length == 0 ? 'Select...' : selectedCuisine;
      }}
    />
  );
  const dietFilter = (
    <SelectDropdown
      data={allDietLabels}
      ref={dropdownRef}
      defaultButtonText={
        selectedDietLabels.length == 0
          ? 'Select...'
          : selectedDietLabels.join(', ')
      }
      onSelect={(item, index) => {
        const newlabels = selectedDietLabels.filter(a => a != item);
        if (newlabels.length == selectedDietLabels.length) {
          newlabels.push(item);
        }
        setSelectedDietLabels(newlabels);
      }}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      buttonTextAfterSelection={(item, index) => {
        return selectedDietLabels.length == 0
          ? 'Select...'
          : selectedDietLabels.join(', ');
      }}
    />
  );
  const healthFilter = (
    <SelectDropdown
      data={allHealthLabels}
      ref={dropdownRef}
      defaultButtonText={
        selectedHealthLabels.length == 0
          ? 'Select...'
          : selectedHealthLabels.join(', ')
      }
      onSelect={(item, index) => {
        const newlabels = selectedHealthLabels.filter(a => a != item);
        if (newlabels.length == selectedHealthLabels.length) {
          newlabels.push(item);
        }
        setSelectedHealthLabels(newlabels);
      }}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      buttonTextAfterSelection={(item, index) => {
        return selectedHealthLabels.length == 0
          ? 'Select...'
          : selectedHealthLabels.join(', ');
      }}
    />
  );
  const modal = (
    <Modal isVisible={modalOpen}>
      <View style={styles.filterContainer}>
        <View style={styles.filterHeaderContainer}>
          <Text style={styles.filterCloseButton2}>X</Text>
          <Text style={styles.filterHeader}>Filters</Text>
          <TouchableOpacity onPress={closeFilters}>
            <Text style={styles.filterCloseButton}>X</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.filterSubheader}>Cuisine:</Text>
        {cuisineFilter}
        <Text style={styles.filterSubheader}>Dietary Restrictions:</Text>
        {dietFilter}
        <Text style={styles.filterSubheader}>Health Restrictions:</Text>
        {healthFilter}
      </View>
    </Modal>
  );
  return (
    <View style={styles.view}>
      {SearchBox(updateSearch, search, performSearch)}
      {isSearching && <ActivityIndicator />}
      {message.length > 0 && <Text style={styles.message}>{message}</Text>}
      {recipes.length > 0 && (
        <View style={styles.view}>
          <FlatList
            data={recipes}
            renderItem={({item}) => RecipeCard(item, getOnClick(item))}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
      {modal}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
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
    fontSize: 16,
  },
  view: {
    height: '100%',
  },
  cuisineType: {
    marginRight: 16,
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  buttonStyle: {
    width: '100%',
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 12,
    maxHeight: 30,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  buttonTextStyle: {
    fontSize: 12,
  },
  rowStyle: {},
  rowTextStyle: {},
  selectedRowTextStyle: {
    color: 'red',
  },
  filterHeader: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 32,
  },
  filterSubheader: {
    marginHorizontal: 16,
    marginBottom: 4,
    marginTop: 8,
  },
  filterContainer: {
    marginRight: 0,
    paddingRight: 32,
    backgroundColor: '#fff',
    paddingTop: 40,
    borderRadius: 32,
    shadowRadius: 40,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 40},
  },
  filterHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 24,
  },
  filterCloseButton: {
    color: '#000',
    fontWeight: '700',
    fontSize: 24,
  },
  filterCloseButton2: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
  filterIcon: {
    tintColor: '#000',
    width: 32,
    height: 32,
    marginRight: 16,
  },
});

export default RecipesView;
