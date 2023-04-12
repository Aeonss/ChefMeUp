from GroceryStores.kroger import KrogerServiceClient
import random

TOKEN = ["Y2hlZm1ldXAtNTA3OTJmZjdkOTNiYjRjYTk4MzIzMjcwMDRiNzRhN2M3NjMxMjczMjY2NTI4MDgzMTAwOmtqak9EcWdWUzdXT1FheWU4N1ZZY25URXhZWUxtc2ljQ0RkVDhmTl8=", "YXNkYXNkLWE4ZjVmMTY3ZjQ0ZjQ5NjRlNmM5OThkZWU4MjcxMTBjNDgxNTY1NzM4MzI1NTQ5OTUyMjp0ZTRCT1luRjd0aFlHYVZsN1JIVzVyV0hkanNMSkpUVXQyWk93MmFB", "YXNkYXMtMGFhMWVhOWE1YTA0Yjc4ZDQ1ODFkZDZkMTc3NDI2Mjc4MjEyODMzMTAxNzQ5MDI1NjMxOmVSQlVHX0xoU09famwteXlOaE1iNHFSa2VEdHh2VC1EVUhzM1Y5M3M=", "YTA5b2thZm8tNmU5MjI4ZWE4Yzg1Y2VlYWU5MjI3NDA5ZWU0MjFjNDg3NDY5NzIwOTk1NTA0ODA3MDA0OkZkVnBDSHJnWm9PWjZabkQ2eW9VRnhISTJTM1JGSHZ5a21ESGRLcEk=", "YXNkcHZuYS1iYWM4ZTg2ZGQ4ZGJmMTBlZWNiOGRlMGYyMDFhMjU1MjQ5NDYyMDQzOTgwMjczOTY2ODk6ZnIwcE1USE15M0VQcGFqWE1TZVlPeF92UFo5bUxxaWNFeFhNYkZucw=="]
randnum = random.randint(0, 4)

client = KrogerServiceClient(encoded_client_token=TOKEN[randnum])
locations = client.get_locations(22030, within_miles=10, limit=5)


products = client.search_products(term="beef", limit=5, location_id=locations[0].get("id"))


print(products)