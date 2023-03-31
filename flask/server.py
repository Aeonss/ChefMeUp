from flask import Flask, render_template, jsonify, request
from bs4 import BeautifulSoup
import requests, json, random

from GroceryStores.kroger import KrogerServiceClient
from GroceryStores.lidl import Lidl

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/recipes", methods=['GET'])
def search_recipe():
    query = request.args.get('q')
    diet = request.args.getlist('diet')
    health = request.args.getlist('health')
    cuisine = request.args.get('cuisine')
    meal = request.args.get('meal')
    dish = request.args.get('dish')
    time = request.args.get('time') # MIN+, MIN-MAX, MAX; + = %2B
    
    api_id = ["0f91a740", "8d908447", "662fb153", "7126e21a", "6e34143b"]
    app_key = ["cfe00546378229eb14793ea770992f82", "b7c90f7191c23bdcff45f9c5399641d1", "611b4d03fad6c242cb395cc6cff93fed", "35f2d885abeef249acb520df8a78f8d2", "3ce229372925813abd79183c9ae5910d"]
    
    randnum = random.randint(0, 4)
    
    url = f"https://api.edamam.com/api/recipes/v2?type=any&q={query}&app_id={api_id[randnum]}&app_key={app_key[randnum]}&random=true"
    
    if len(diet) > 0:
        for d in diet:
            url += f"&diet={d}"
    
    if len(health) > 0:
        for h in health:
            url += f"&health={h}"
    if cuisine != None:
        url += f"&cuisineType={cuisine}"
    if meal != None:
        url += f"&mealType={meal}"
    if dish != None:
        url += f"&dishType={dish}"
    if time != None:
        url += f"&time={time}"
    
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    
    json_recipes = []
    recipes = json.loads(soup.text)['hits']

    for recipe in recipes:
        recipe = recipe["recipe"]
        data = {}
        data['id'] = recipe["uri"]
        data['name'] = recipe["label"]
        data['sourceUrl'] = recipe["url"]
        data['imageUrl'] = recipe["image"]
        data['mealType'] = recipe["mealType"]
        data['dishType'] = recipe["dishType"]
        data['cuisineType'] = recipe["cuisineType"]
        data['totalMinutes'] = recipe["totalTime"]
        data['dietLabels'] = recipe["dietLabels"]
        data['healthLabels'] = recipe["healthLabels"]
        data['calories'] = recipe["totalNutrients"]["ENERC_KCAL"]["quantity"]
        data['totalCost'] =  ""
        data['numberServings'] = recipe["yield"]
        data['ingredients'] = []
        
        for ingredient in recipe["ingredients"]:
            json_ingredient = {}
            json_ingredient['fullName'] = ingredient['text']
            json_ingredient['name'] = ingredient['food']
            json_ingredient['amount'] = ingredient['quantity']
            json_ingredient['unit'] = ingredient['measure']
            json_ingredient['category'] = ingredient['foodCategory']
            json_ingredient['imageUrl'] = ingredient['image']
            data['ingredients'].append(json_ingredient)
        
        data['instructions'] = recipe["url"]

        json_recipes.append(data)
    
    return jsonify(json_recipes)


@app.route("/grocery", methods=['GET'])
def search_zip():
    zipcode = request.args.get('zipcode')
    
    all_locations = []
    
    # Kroger
    TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="
    client = KrogerServiceClient(encoded_client_token=TOKEN)
    locations = client.get_locations(zipcode, within_miles=10, limit=5)
    
    for location in locations:
        all_locations.append(location)
    
    
    # Lidl (Need proxy)
    locations = Lidl.get_locations(zipcode, 5)
    for location in locations:
        all_locations.append(location)
        
    
    return jsonify(all_locations)
    

@app.route("/item", methods=['GET'])
def search_item():
    storeid = request.args.get('storeid')
    query = request.args.get('q')
    TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="
    client = KrogerServiceClient(encoded_client_token=TOKEN)

    products = client.search_products(term=query, limit=5, location_id=storeid)
    
    json_items = []
    for product in products:
        json_items.append(product)
        
    return jsonify(json_items)

if __name__ == "__main__":
    app.run()
