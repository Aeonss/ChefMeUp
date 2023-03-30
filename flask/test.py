
from Kroger.kroger import KrogerClient, KrogerServiceClient

TOKEN = "Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8="

client = KrogerServiceClient(encoded_client_token=TOKEN)

products = client.search_products(term="banana", limit=10, location_id='02600845')
print(products)