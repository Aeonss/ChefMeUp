import { Ingredient } from '../model/Ingredient';
import { PurchaseOption } from '../model/PurchaseOption';
import {Recipe} from '../model/Recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://143.198.190.172';

async function fetchRecipes(query: string, cuisine: string, dietLabels: string[], healthLabels: string[]) {
  let encodedQuery = encodeURIComponent(query);
  if (cuisine.length > 0) {
    encodedQuery += `&cuisine=${cuisine.toLowerCase()}`
  }
  if (dietLabels.length > 0) {
    dietLabels.forEach((label) => {
        encodedQuery += `&diet=${label}`
    })
  }
  if (healthLabels.length > 0) {
    healthLabels.forEach((label) => {
        encodedQuery += `&health=${label}`
    })
  }
  const response = await fetch(`${baseURL}/recipes?q=${encodedQuery}`);
  const json = await response.json();
  if (response.ok) {
    return json as Recipe[];
  } else {
    return Promise.reject('Unable to fetch recipes');
  }
}

async function fetchPrice(recipe: Recipe) {
  const zipcode = await AsyncStorage.getItem('@ZIPCODE');
  let query = `${baseURL}/price?zipcode=${zipcode}&stores=4`;
  recipe.ingredients.forEach(ingredient => {
    query += `&item=${encodeURIComponent(ingredient.name)}`;
  });
  const response = await fetch(query);
  const json = await response.json();
  if (response.ok) {
    return json as PurchaseOption[];
  } else {
    return Promise.reject('Unable to fetch price');
  }
}

async function fetchPrices(ingredients: string[]) {
    const zipcode = await AsyncStorage.getItem('@ZIPCODE');
    let query = `${baseURL}/price?zipcode=${zipcode}&stores=4`;
    ingredients.forEach(ingredient => {
      query += `&item=${encodeURIComponent(ingredient)}`;
    });
    const response = await fetch(query);
    const json = await response.json();
    if (response.ok) {
      return json as PurchaseOption[];
    } else {
      return Promise.reject('Unable to fetch price');
    }
  }

export default {fetchRecipes, fetchPrice, fetchPrices};
