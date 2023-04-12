# ChefMeUp

## Frontend

To run the React Native app, perform the following:

Install [React Native](https://reactnative.dev/docs/environment-setup?guide=native). Make sure the ANDROID_HOME environmental variable is set. A system restart may be necessary.

Install [Android Studio](https://developer.android.com/studio)

[Create a virtual device on Android Studio](https://developer.android.com/studio/run/managing-avds)

Start the virtual device.

Run the following commands:
```bash
cd ChefMeUp
npm i   # if you haven't run this before
npm run start
```


## Backend
Flask Server: https://hmhing.pythonanywhere.com/

## Endpoints
* /recipes?q=QUERY
* /recipes?q=QUERY&diet=DIET&health=HEALTH&cuisine=CUISINE&meal=MEAL&dish=DISH&time=TIME
    * Example: /recipes?q=rice&health=alcohol-free&health=dairy-free&cuisine=mexican
* /recipe?id=ID&zipcode=ZIPCODE 
* /grocery?zipcode=ZIPCODE
* /item?storeid=STOREID&q=QUERY


## Filters for recipes:

### Diet Labels
* balanced
    * Protein/Fat/Carb values in 15/35/50 ratio
* high-fiber
    * More than 5g fiber per serving
* high-protein
    * More than 50% of total calories from proteins
* low-carb
    * Less than 20% of total calories from carbs
* low-fat
    * Less than 15% of total calories from fat
* low-sodium
    * Less than 140mg Na per serving


### Health Labels
* alcohol-cocktail
    * Describes an alcoholic cocktail
* alcohol-free
    * No alcohol used or contained
* celery-free
    * Does not contain celery or derivatives
* crustacean-free
    * Does not contain crustaceans (shrimp, lobster etc.) or derivatives
* dairy-free
    * No dairy; no lactose
* DASH
    * Dietary Approaches to Stop Hypertension diet
* egg-free
    * No eggs or products containing eggs
* fish-free
    * No fish or fish derivatives
* fodmap-free
    * Does not contain FODMAP foods
* gluten-free
    * No ingredients containing gluten
* immuno-supportive	
    * Recipes which fit a science-based approach to eating to strengthen the immune system
* keto-friendly
    * Maximum 7 grams of net carbs per serving
* kidney-friendly
    * Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium less than 500 mg
* kosher
    * Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves
* low-potassium	
    * Less than 150mg per serving
* low-sugar
    * No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose
* lupine-free
    * Does not contain lupine or derivatives
* Mediterranean
    * Mediterranean diet
* mollusk-free
    * No mollusks
* mustard-free
    * Does not contain mustard or derivatives
* No-oil-added
    * No oil added except to what is contained in the basic ingredients
* paleo
    * Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils
* peanut-free
    * No peanuts or products containing peanuts
* pecatarian
    * Does not contain meat or meat based products, can contain dairy and fish
* pork-free
    * Does not contain pork or derivatives
* red-meat-free
    * Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.
* sesame-free
    * Does not contain sesame seed or derivatives
* shellfish-free
    * No shellfish or shellfish derivatives
* soy-free
    * No soy or products containing soy
* sugar-conscious
    * Less than 4g of sugar per serving
* sulfite-free
    * No Sulfites
* tree-nut-freebritish
    * No tree nuts or products containing tree nuts
* vegan
    * No meat, poultry, fish, dairy, eggs or honey
* vegetarian
    * No meat, poultry, or fish
* wheat-free
    * No wheat, can have gluten though

### Cuisine Type
* american
* asian
* british
* caribbean
* central europe
* chinese
* eastern europe
* french
* greek
* indian
* italian
* japanese
* korean
* kosher
* mediterranean
* mexican
* middle eastern
* nordic
* south american
* south east asian
* world

### Meal Type
* brunch
* lunch/dinner
* snack
* teatime

### Dish Type
* alcohol cocktail
* biscuits and cookies
* bread
* cereals
* condiments and sauces
* desserts
* drinks
* egg
* ice cream and custard
* main course
* pancake
* pasta
* pastry
* pies and tarts
* pizza
* preps
* preserve
* salad
* sandwiches
* seafood
* side dish
* soup
* special occasions
* starter
* sweets

### Time
* MIN%2B
* MIN-MAX
* MAX


## APIs
* [Edamam](https://developer.edamam.com/edamam-recipe-api)
* [Kroger](https://developer.kroger.com/reference/)


## Notes
Information about the data models and tags are available in `/info`