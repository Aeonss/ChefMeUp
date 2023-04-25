import { Ingredient } from '../model/Ingredient';
import { PurchaseOption } from '../model/PurchaseOption';
import {Recipe} from '../model/Recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://hmhing.pythonanywhere.com';

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
    console.log(json);
    return json as Recipe[];
  } else {
    return Promise.reject('Unable to fetch recipes');
  }
}

async function fetchPrice(recipe: Recipe) {
  const zipcode = await AsyncStorage.getItem('@ZIPCODE');
  let query = `${baseURL}/price?zipcode=${zipcode}&stores=3`;
  recipe.ingredients.forEach(ingredient => {
    query += `&item=${encodeURIComponent(ingredient.name)}`;
  });
  console.log(query);
  const response = await fetch(query);
  const json = await response.json();
  if (response.ok) {
    console.log(json);
    return json as PurchaseOption[];
  } else {
    return Promise.reject('Unable to fetch price');
  }
}

async function fetchPrices(ingredients: Ingredient[]) {
    const zipcode = await AsyncStorage.getItem('@ZIPCODE');
    let query = `${baseURL}/price?zipcode=${zipcode}&stores=3`;
    ingredients.forEach(ingredient => {
      query += `&item=${encodeURIComponent(ingredient.name)}`;
    });
    console.log(query);
    const response = await fetch(query);
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      return json as PurchaseOption[];
    } else {
      return Promise.reject('Unable to fetch price');
    }
  }

export default {fetchRecipes, fetchPrice, fetchPrices};
