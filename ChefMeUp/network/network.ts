import { PurchaseOption } from '../model/PurchaseOption';
import {Recipe} from '../model/Recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://hmhing.pythonanywhere.com';

async function fetchRecipes(query: string) {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`${baseURL}/recipes?q=${encodedQuery}`);
  const json = await response.json();
  if (response.ok) {
    console.log(json);
    return json as Recipe[];
  } else {
    return Promise.reject('Unable to fetch recipes');
  }
}

async function fetchPrice(recipe: Recipe) {
  const zipcode = await AsyncStorage.getItem('@ZIPCODE');
  let query = `${baseURL}/price?zipcode=${zipcode}`;
  recipe.ingredients.forEach(ingredient => {
    query += `&item=${encodeURIComponent(ingredient.name)}`;
  });
  const response = await fetch(query);
  const json = await response.json();
  if (response.ok) {
    console.log(json);
    return json as PurchaseOption[];
  } else {
    return Promise.reject('Unable to fetch price');
  }
}

export default {fetchRecipes, fetchPrice};
