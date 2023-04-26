from bs4 import BeautifulSoup
import requests, json

class LidlClient:
    def get_locations(self, zipcode, limit): 
        url = f"https://mobileapi.lidl.com/v1/stores?q={zipcode}"
        soup = BeautifulSoup(requests.get(url).text, "html.parser")

        json_locations = []

        locations = soup.text.replace(" ", "")

        i = 0
        for location in json.loads(locations)["results"]:
            if i >= limit:
                break
            
            data = {}
            data['id'] = location['id']
            data['name'] = "Lidl - " + location['name']
            data['logoUrl'] = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/1024px-Lidl-Logo.svg.png"
            data['address'] = location['address']['street'] + ", " + location['address']['city'] + ", " + location['address']['state'] + " " + location['address']['zip']

            json_locations.append(data)
            i += 1
            
        return json_locations
    
    def search_products(self, query, store_id, limit):
        url = f"https://mobileapi.lidl.com/v1/search/products?numResults={limit}&q={query}&storeId={store_id}"
        soup = BeautifulSoup(requests.get(url).text, "html.parser")
        
        json_item = []
        
        for item in json.loads(soup.text)['results']:
            data = {}
            data['storeId'] = store_id
            data['price'] = item['price']['currentPrice']['value']
            data['description'] = item['name']
            data['imageUrl'] = item['images'][0]['url']
            data['amount'] = item['description']
            json_item.append(data)
        
        return json_item