from bs4 import BeautifulSoup
from fp.fp import FreeProxy
import requests, json

class Lidl:
    def get_locations(zipcode, limit):
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
            data['logoUrl'] = ""
            data['distance'] = ""
            data['address'] = location['address']['street'] + ", " + location['address']['city'] + ", " + location['address']['state'] + " " + location['address']['zip']

            json_locations.append(data)
            i += 1
            
        return json_locations