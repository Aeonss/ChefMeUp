from flask import Flask, render_template, jsonify, request
from bs4 import BeautifulSoup
import requests, json, random

from GroceryStores.kroger import KrogerServiceClient
from GroceryStores.lidl import Lidl

TOKEN = ["Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8=", "YXNkYXNkLWE4ZjVmMTY3ZjQ0ZjQ5NjRlNmM5OThkZWU4MjcxMTBjNDgxNTY1NzM4MzI1NTQ5OTUyMjp0ZTRCT1luRjd0aFlHYVZsN1JIVzVyV0hkanNMSkpUVXQyWk93MmFB", "YXNkYXMtMGFhMWVhOWE1YTA0Yjc4ZDQ1ODFkZDZkMTc3NDI2Mjc4MjEyODMzMTAxNzQ5MDI1NjMxOmVSQlVHX0xoU09famwteXlOaE1iNHFSa2VEdHh2VC1EVUhzM1Y5M3M=", "YTA5b2thZm8tNmU5MjI4ZWE4Yzg1Y2VlYWU5MjI3NDA5ZWU0MjFjNDg3NDY5NzIwOTk1NTA0ODA3MDA0OkZkVnBDSHJnWm9PWjZabkQ2eW9VRnhISTJTM1JGSHZ5a21ESGRLcEk=", "YXNkcHZuYS1iYWM4ZTg2ZGQ4ZGJmMTBlZWNiOGRlMGYyMDFhMjU1MjQ5NDYyMDQzOTgwMjczOTY2ODk6ZnIwcE1USE15M0VQcGFqWE1TZVlPeF92UFo5bUxxaWNFeFhNYkZucw=="]

api_id = ["0f91a740", "8d908447", "662fb153", "7126e21a", "6e34143b"]
app_key = ["cfe00546378229eb14793ea770992f82", "b7c90f7191c23bdcff45f9c5399641d1", "611b4d03fad6c242cb395cc6cff93fed", "35f2d885abeef249acb520df8a78f8d2", "3ce229372925813abd79183c9ae5910d"]


app = Flask(__name__)


@app.route("/")
def home():
    return render_template('home.html')


# Gets a list of recipes with the given search term
@app.route("/recipes", methods=['GET'])
def search_recipe():
    query = request.args.get('q')
    diet = request.args.getlist('diet')
    health = request.args.getlist('health')
    cuisine = request.args.get('cuisine')
    meal = request.args.get('meal')
    dish = request.args.get('dish')
    time = request.args.get('time') # MIN+, MIN-MAX, MAX; + = %2B
    
    
    randnum = random.randint(0, 4)
    url = f"https://api.edamam.com/api/recipes/v2?type=public&q={query}&app_id={api_id[randnum]}&app_key={app_key[randnum]}&random=true"
    
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
        data['id'] = recipe["uri"].split("_")[1]
        data['name'] = recipe["label"]
        data['sourceUrl'] = recipe["url"]
        data['imageUrl'] = recipe["image"]
        data['mealType'] = recipe["mealType"]
        try:
            data['dishType'] = recipe["dishType"]
        except:
            pass
        data['cuisineType'] = recipe["cuisineType"]
        data['totalMinutes'] = recipe["totalTime"]
        data['dietLabels'] = recipe["dietLabels"]
        data['healthLabels'] = recipe["healthLabels"]
        data['calories'] = recipe["totalNutrients"]["ENERC_KCAL"]["quantity"]
        
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
        

# Gets a recipe via an id and estimates the cost of the recipe
@app.route("/recipe", methods=['GET'])
def get_recipe():
    recipe_id = request.args.get('id')
    zipcode = request.args.get('zipcode')
    stores = request.args.get('stores')
    
    randnum = random.randint(0, 4)
    url = f"https://api.edamam.com/api/recipes/v2/{recipe_id}?type=public&app_id={api_id[randnum]}&app_key={app_key[randnum]}&random=true"
    
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    
    recipe = json.loads(soup.text)['recipe']

    data = {}
    data['id'] = recipe["uri"].split("_")[1]
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
    
    if zipcode != None:
        # Kroger
        randnum = random.randint(0, 4)
        client = KrogerServiceClient(encoded_client_token=TOKEN[randnum])
        
        if stores == None:
            stores = 2
        
        # Find closest store ids
        locations = client.get_locations(zipcode, within_miles=10, limit=stores)
        location_ids = []
        for location in locations:
            location_ids.append(location.get("id"))
        
        data['totalCost'] = calculateCost(data['ingredients'], client, location_ids, True)
        
    else:
        data['totalCost'] = ""
    
    data['instructions'] = recipe["url"]
    
    return jsonify(data)


# Calculates the cost of a recipe of list of items
def calculateCost(recipe, client, location_ids, isRecipe):
    prices = []
    
    for location_id in location_ids:
        
        data = {}
        price = 0.0
        
        for ingredient in recipe:
            
            if isRecipe:
                name = ingredient.get("name")
                amount = ingredient.get("amount")
                unit = ingredient.get("unit")
            else:
                name = ingredient
                
            # ~ 6 seconds for 1 store and 11 ingredients (11 searches)
            # ~ 16 seconds for 2 stores and 11 ingredients (22 searches)
            # ~ 21 seconds for 3 stores and 6 ingredients (18 searches)
            # ~ 35 seconds for 5 stores and 11 ingredients (55 searches)
            products = client.search_products(term=name, limit=5, location_id=location_id)
            
            # Need to compare amount and unit
            # For now it gets the first grocery price
            
            # print(products[0]['description'])
            # print(products[0]['price'])
            
            # Get first product item price (future: need to find product that fits amount needed)
            price += products[0]['price']
        
        data['storeId'] = location_id
        data['price'] = round(price, 2)
        
        prices.append(data)
    
    return prices


# Gets a list of grocery stores in the given zipcode with an optional param of stores and radius
@app.route("/grocery", methods=['GET'])
def search_zip():
    zipcode = request.args.get('zipcode')
    stores = request.args.get('stores')
    radius = request.args.get('radius')
    
    if stores == None:
        stores = 5
    if radius == None:
        radius = 10
    
    all_locations = []
    
    # Kroger
    randnum = random.randint(0, 4)
    client = KrogerServiceClient(encoded_client_token=TOKEN[randnum])
    locations = client.get_locations(zipcode, within_miles=radius, limit=stores)
    
    # Return Kroger locations
    for location in locations:
        all_locations.append(location)
    
    return jsonify(all_locations)
    
    
# Gets the list of products from a given item name and storeId
@app.route("/item", methods=['GET'])
def search_item():
    storeid = request.args.get('storeid')
    query = request.args.get('q')
    
    randnum = random.randint(0, 4)
    client = KrogerServiceClient(encoded_client_token=TOKEN[randnum])

    products = client.search_products(term=query, limit=5, location_id=storeid)
    
    json_items = []
    for product in products:
        json_items.append(product)
        
    return jsonify(json_items)


# Gets the price of a list of items
@app.route("/price", methods=['GET'])
def get_price():
    ingredients = request.args.getlist('item')
    zipcode = request.args.get('zipcode')
    stores = request.args.get('stores')
    
    # Kroger
    randnum = random.randint(0, 4)
    client = KrogerServiceClient(encoded_client_token=TOKEN[randnum])
        
    if stores == None:
        stores = 2
        
    locations = client.get_locations(zipcode, within_miles=10, limit=stores)
    location_ids = []
    for location in locations:
        location_ids.append(location.get("id"))

    prices = calculateCost(ingredients, client, location_ids, False)

    return jsonify(prices)
    
    

# Gets the distance in miles between 2 coordinates
@app.route("/distance", methods=['GET'])
def calc_distance():
    lon1 = request.args.get('lon1')
    lat1 = request.args.get('lat1')
    
    lon2 = request.args.get('lon2')
    lat2 = request.args.get('lat2')
    
    r = requests.get(f"http://router.project-osrm.org/route/v1/car/{lon1},{lat1};{lon2},{lat2}?overview=false")

    route = json.loads(r.content).get("routes")[0]

    # Convert feet to miles
    distance = route.get("legs")[0]['distance'] / 1609
    
    return str(round(distance, 2))


# Gets the latitude and longitude coordinates of an address
@app.route("/address2coord", methods=['GET'])
def addressToCoord():
    address = request.args.get('address')
    
    parsed_address = address.replace(" ", "+")

    r = requests.get(f"http://nominatim.openstreetmap.org/search?q={parsed_address}&format=json&polygon=1&addressdetails=1")
    data = json.loads(r.content)
    
    json_data = {}
    json_data['lat'] = data[0]["lat"]
    json_data['lon'] = data[0]["lon"]
    
    return jsonify(json_data)


if __name__ == "__main__":
    app.run()
