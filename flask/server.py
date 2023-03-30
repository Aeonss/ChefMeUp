from flask import Flask, render_template, jsonify
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/recipes/<query>", methods=['GET'])
def search(query):
    
    url = f"https://api.edamam.com/api/recipes/v2?type=any&q={query}&app_id=0f91a740&app_key=cfe00546378229eb14793ea770992f82"
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
        data['totalMinutes'] = recipe["totalTime"]
        data['totalCost'] =  ""
        data['numberServings'] = recipe["yield"]
        data['ingredients'] = recipe["ingredientLines"]
        data['instructions'] = "Instructions on source URL"

        json_recipes.append(data)
    
    return jsonify(json_recipes)

if __name__ == "__main__":
    app.run()
