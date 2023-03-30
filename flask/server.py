from flask import Flask, render_template, jsonify
from bs4 import BeautifulSoup
import requests, json, random

from Kroger.kroger import KrogerClient, KrogerServiceClient

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/recipes/<query>", methods=['GET'])
def search_recipe(query):
    
    api_id = ["0f91a740", "8d908447", "662fb153", "7126e21a", "6e34143b"]
    app_key = ["cfe00546378229eb14793ea770992f82", "b7c90f7191c23bdcff45f9c5399641d1", "611b4d03fad6c242cb395cc6cff93fed", "35f2d885abeef249acb520df8a78f8d2", "3ce229372925813abd79183c9ae5910d"]
    
    randnum = random.randint(0, 4)
    
    url = f"https://api.edamam.com/api/recipes/v2?type=any&q={query}&app_id={api_id[randnum]}&app_key={app_key[randnum]}"
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    
    print(api_id[randnum])
    print(app_key[randnum])
    
    json_recipes = []
    recipes = json.loads(soup.text)['hits']

    for recipe in recipes:
        recipe = recipe["recipe"]
        data = {}
        data['id'] = recipe["uri"]
        data['name'] = recipe["label"]
        data['sourceUrl'] = recipe["url"]
        data['imageUrl'] = recipe["image"]
        data['totalMinutes'] = recipe["totalTime"]
        data['totalCost'] =  ""
        data['numberServings'] = recipe["yield"]
        data['ingredients'] = recipe["ingredientLines"]
        data['instructions'] = "Instructions on source URL"

        json_recipes.append(data)
    
    return jsonify(json_recipes)


@app.route("/grocery/locations/<zipcode>", methods=['GET'])
def search_zip(zipcode):
    TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="
    client = KrogerServiceClient(encoded_client_token=TOKEN)
    location = client.get_locations(zipcode, within_miles=10, limit=10)
    return jsonify(location)
    

@app.route("/grocery/item/<storeid>/<query>", methods=['GET'])
def search_item(storeid, query):
    TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="
    client = KrogerServiceClient(encoded_client_token=TOKEN)

    products = client.search_products(term=query, limit=5, location_id=storeid)
    
    json_items = []
    for product in products:
        json_items.append(product)
        
        
    return jsonify(json_items)

if __name__ == "__main__":
    app.run()
