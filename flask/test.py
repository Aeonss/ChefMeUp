from GroceryStores.lidl import Lidl
import json


print(json.dump(Lidl.get_locations(22030, 5)))