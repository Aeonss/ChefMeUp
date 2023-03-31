from GroceryStores.lidl import Lidl
import json
from urllib import request
from bs4 import BeautifulSoup
from fp.fp import FreeProxy


proxy = FreeProxy(country_id=['US']).get()

proxy_support = request.ProxyHandler({"https" : proxy})

user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'
headers = {
    'User-Agent': user_agent,
    'accept-language': 'ru,en-US;q=0.9,en;q=0.8,tr;q=0.7'
}



url = f"https://mobileapi.lidl.com/v1/stores?q=22030"

opener = request.build_opener(proxy_support)
request.install_opener(opener)

req = request.Request(url, headers=headers)

try:
    response = request.urlopen(req).read()
    soup = BeautifulSoup(response, "html.parser")
    locations = soup.text.replace(" ", "")


    for location in json.loads(locations)['results']:
        
        print(json.dumps(location))
        break
except Exception as e:
    print(e)