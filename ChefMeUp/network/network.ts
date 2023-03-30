import {Recipe} from '../model/Recipe';

const baseURL = 'https://hmhing.pythonanywhere.com';

async function fetchRecipes(query: string) {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`${baseURL}/recipes/${encodedQuery}`);
  const json = await response.json();
  if (response.ok) {
    console.log(json);
    return json as Recipe[];
  } else {
    return Promise.reject('Unable to fetch recipes');
  }
}

export default {fetchRecipes};
