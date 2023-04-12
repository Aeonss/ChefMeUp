import json, requests

class KrogerClient:
    def _make_get_request(self, endpoint, params=None):
        url = "https://api.kroger.com/v1" + endpoint
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.token}',
        }

        response = requests.get(url, headers=headers, params=params)
        return json.loads(response.text)

    def search_products(self, term=None, location_id=None, product_id=None, brand=None, fulfillment='csp', limit=5):
        params = self.get_mapped_params(locals())
        endpoint = '/products'
        
        results = self._make_get_request(endpoint, params=params)
        products = results.get('data')
        
        json_item = []

        for item in products:
            data = {}
            data['storeId'] = location_id
            data['price'] = item['items'][0]['price']['regular']
            data['description'] = item['description']
            data['imageUrl'] = item['images'][0]['sizes'][0]['url']
            data['amount'] = item['items'][0]['size']
            json_item.append(data)
        return json_item

    def get_locations(self, zipcode, within_miles=None, limit=None, chain=None):
        params = self.get_mapped_params(locals())
        endpoint = '/locations'

        results = self._make_get_request(endpoint, params=params)
        stores = results.get('data')
        
        json_locations = []
        
        for location in stores:
            data = {}
            data['id'] = location['locationId']
            data['name'] = location['chain']
            
            if location['chain'] == "HART":
                data['logoUrl'] = "https://cdn.freebiesupply.com/logos/large/2x/harris-teeter-2-logo-png-transparent.png"
            elif location['chain'] == "KROGER":
                data['logoUrl'] = "https://brandslogos.com/wp-content/uploads/images/large/kroger-logo.png"
            else:
                data['logoUrl'] = ""
                
            data['address'] = location['address']['addressLine1'] + ", " + location['address']['city'] + ", " + location['address']['state'] + " " + location['address']['zipCode']
            
            json_locations.append(data)
        
        return json_locations
    
    

    def get_mapped_params(self, params):
        param_map = {
            'brand': 'filter.brand',
            'chain': 'filter.chain',
            'fulfillment': 'filter.fulfillment',
            'limit': 'filter.limit',
            'location_id': 'filter.locationId',
            'product_id': 'filter.product_id',
            'term': 'filter.term',
            'within_miles': 'filter.radiusInMiles',
            'zipcode': 'filter.zipCode.near',
        }
        
        return { param_map[key] : value for key, value in params.items() if key != 'self'}
    
    
class KrogerServiceClient(KrogerClient):

    def __init__(self, encoded_client_token):
        self.token = self.get_client_access_token(encoded_client_token)
        
    def get_client_access_token(self, encoded_client_token):
        url = 'https://api.kroger.com/v1/connect/oauth2/token'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': f'Basic {encoded_client_token}',
        }
        payload = {
            'grant_type':"client_credentials",
            'scope':['product.compact'],
        }
        response = requests.post(url, headers=headers, data=payload)
        
        return json.loads(response.text).get('access_token')