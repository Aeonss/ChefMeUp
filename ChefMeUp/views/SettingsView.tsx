import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {Keyboard} from 'react-native';

const SettingsView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [zipcode, setZipcode] = useState('');
  const [initialFetch, setInitialFetch] = useState(false);

  const saveZipcode = async () => {
    Keyboard.dismiss();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('@ZIPCODE', zipcode);
    } catch (e) {
      console.log('Error saving zipcode: ', e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (initialFetch) {
      return;
    }
    setInitialFetch(true);
    const fetchZipcode = async () => {
      try {
        const value = await AsyncStorage.getItem('@ZIPCODE');
        if (value !== null) {
          setZipcode(value);
        }
      } catch (e) {
        console.log('Error fetching zipcode: ', e);
      }
      setIsLoading(false);
    };
    fetchZipcode();
  });

  return (
    <View style={styles.view}>
      <Text style={styles.message}>Save your zip code:</Text>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={setZipcode}
          value={zipcode}
          placeholder="12345"
          placeholderTextColor="#555"
          style={styles.searchInput}
          returnKeyType="search"
          keyboardType="number-pad"
          textContentType="postalCode"
          onSubmitEditing={saveZipcode}></TextInput>
        <TouchableOpacity onPress={saveZipcode} style={styles.searchIcon}>
          <Image
            source={require('../assets/bxs-save.png')}
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

const Stack = createStackNavigator();

const SettingsViewWrapper = () => {
  return (
    <Stack.Screen
      name="RecipeGroceriesView"
      component={SettingsView}
      options={{title: 'Settings'}}
    />
  );
};

const SettingsStack = () => (
  <Stack.Navigator>{SettingsViewWrapper()}</Stack.Navigator>
);

export default SettingsStack;
