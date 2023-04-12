import requests
import json

def findDistance(lon1, lat1, lon2, lat2):
    r = requests.get(f"http://router.project-osrm.org/route/v1/car/{lon1},{lat1};{lon2},{lat2}?overview=false")

    route = json.loads(r.content).get("routes")[0]

    # Convert feet to miles
    distance = route.get("legs")[0]['distance'] / 1609
    
    print(distance)
    return distance



def addressToCoord(address):
    parsed_address = address.replace(" ", "+")

    r = requests.get(f"http://nominatim.openstreetmap.org/search?q={parsed_address}&format=json&polygon=1&addressdetails=1")
    data = json.loads(r.content)
    
    lat = data[0]["lat"]
    lon = data[0]["lon"]
    return (lon, lat)


coord1 = addressToCoord("400 Broce Dr, Blacksburg, VA")
coord2 = addressToCoord("Tysons Corner Center, 1961 Chain Bridge Rd, Tysons, VA")

findDistance(coord1[0], coord1[1], coord2[0], coord2[1])
#print(findDistance(coord1[0], coord1[1], coord2[0], coord2[1]))