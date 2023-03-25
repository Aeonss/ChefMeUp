from bs4 import BeautifulSoup
import cloudscraper
import pgeocode
import json

class CostcoClient:
    def get_locations(self, zipcode):
        nomi = pgeocode.Nominatim('us')
        lat = nomi.query_postal_code(zipcode).latitude
        lon = nomi.query_postal_code(zipcode).longitude
        
        scraper = cloudscraper.create_scraper(delay=10, browser='chrome')
        url = f"https://www.costco.com/AjaxWarehouseBrowseLookupView?langId=-1&storeId=10301&numOfWarehouses=10&latitude={lat}&longitude={lon}&countryCode=US"
        #print(url)
        soup = BeautifulSoup(scraper.get(url).text, "html.parser")
        print(soup.text)
        
    def search_products(self, item):
        scraper = cloudscraper.create_scraper(delay=10, browser='chrome')
        soup = BeautifulSoup(scraper.get(f"https://www.costco.com/CatalogSearch?dept=All&keyword={item}").text, "html.parser")
        result = soup.find(class_="product-list grid")
        print(result)

client = CostcoClient()
client.get_locations(94804)


#client.search_products("cheese")