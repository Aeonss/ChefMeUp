import json, requests
from client import KrogerClient, KrogerServiceClient

# Token = base64(client_id:client_secret)
TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="


client = KrogerServiceClient(encoded_client_token=TOKEN)

products = client.search_products(term="banana", limit=10, location_id='02600845')
print(products)

location = client.get_locations(24060, within_miles=10, limit=10)
print(location)
