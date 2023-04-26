from bs4 import BeautifulSoup
import json, requests

proxies = {"http": "http://161.35.70.249:8080",
           "http": "http://139.99.237.62:80"}
        
zipcode=22030
url = f"https://mobileapi.lidl.com/v1/stores?q={zipcode}"
r = requests.get(url, proxies=proxies)
print(r.content)