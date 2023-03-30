from bs4 import BeautifulSoup
import json, requests

url = "https://www.themealdb.com/api/json/v1/1/search.php?s=rice"
soup = BeautifulSoup(requests.get(url).text, "html.parser")
soup.text

recipes = []

meals = json.loads(soup.text)
for recipe in meals['meals']:
        data = {}
        data['id'] = recipe["idMeal"]
        data['name'] = recipe["strMeal"]
        data['sourceUrl'] = recipe["strSource"]
        data['imageUrl'] = recipe["strMealThumb"]
        data['totalMinutes'] = ""
        data['totalCost'] =  ""
        data['numberServings'] = ""
        
        ingredients = []
        ingredients.append(recipe["strIngredient1"])
        ingredients.append(recipe["strIngredient2"])
        ingredients.append(recipe["strIngredient3"])
        ingredients.append(recipe["strIngredient4"])
        ingredients.append(recipe["strIngredient5"])
        ingredients.append(recipe["strIngredient6"])
        ingredients.append(recipe["strIngredient7"])
        ingredients.append(recipe["strIngredient8"])
        ingredients.append(recipe["strIngredient9"])
        ingredients.append(recipe["strIngredient10"])
        ingredients.append(recipe["strIngredient11"])
        ingredients.append(recipe["strIngredient12"])
        ingredients.append(recipe["strIngredient13"])
        ingredients.append(recipe["strIngredient14"])
        ingredients.append(recipe["strIngredient15"])
        ingredients.append(recipe["strIngredient16"])
        ingredients.append(recipe["strIngredient17"])
        ingredients.append(recipe["strIngredient18"])
        ingredients.append(recipe["strIngredient19"])
        ingredients.append(recipe["strIngredient20"])
        
        data['ingredients'] = ingredients
        data['instructions'] = recipe["strInstructions"]
        recipes.append(data)
    
print(recipes)