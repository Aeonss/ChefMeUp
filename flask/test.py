from GroceryStores.lidl import Lidl
import json


print(json.dumps(Lidl.get_locations(22030, 5)))