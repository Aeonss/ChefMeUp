from bs4 import BeautifulSoup
import cloudscraper
import json, requests

class LidlClient:
    def get_locations(self, zipcode):        
        url = f"https://mobileapi.lidl.com/v1/stores?q={zipcode}"
        soup = BeautifulSoup(requests.get(url).text, "html.parser")
        print(soup.text.replace(" ", ""))
        
    def search_products(self, item, storeId):
        scraper = cloudscraper.create_scraper(delay=10, browser='chrome')
        soup = BeautifulSoup(scraper.get(f"https://mobileapi.lidl.com/v1/search/products?numResults=3&q={item}&storeId={storeId}").text, "html.parser")
        print(soup)

client = LidlClient()
client.get_locations(22030)
#client.search_products("cheese", "US01053")