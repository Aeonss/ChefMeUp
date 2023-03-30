from GroceryStores.lidl import Lidl
import json, requests, random
from bs4 import BeautifulSoup


api_id = ["0f91a740", "8d908447", "662fb153", "7126e21a", "6e34143b"]
app_key = ["cfe00546378229eb14793ea770992f82", "b7c90f7191c23bdcff45f9c5399641d1", "611b4d03fad6c242cb395cc6cff93fed", "35f2d885abeef249acb520df8a78f8d2", "3ce229372925813abd79183c9ae5910d"]

randnum = random.randint(0, 4)

query = "chicken"

url = f"https://api.edamam.com/api/recipes/v2?type=any&q={query}&app_id={api_id[randnum]}&app_key={app_key[randnum]}"
soup = BeautifulSoup(requests.get(url).text, "html.parser")

json_recipes = []
recipes = json.loads(soup.text)['hits']

for recipe in recipes:
    recipe = recipe["recipe"]
    print(json.dumps(recipe))
    break