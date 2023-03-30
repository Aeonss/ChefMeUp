from bs4 import BeautifulSoup
import json, requests

url = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0f91a740&app_key=cfe00546378229eb14793ea770992f82"
soup = BeautifulSoup(requests.get(url).text, "html.parser")

json_recipes = []

recipes = json.loads(soup.text)['hits']

    
print(len(recipes))