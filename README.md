# ChefMeUp

### Frontend

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

### Backend

Flask Server: https://hmhing.pythonanywhere.com/

**Endpoint**
* /recipes?q=QUERY
* /recipes?q=QUERY&diet=DIET&health=HEALTH&cuisine=CUISINE&meal=MEAL&dish=DISH&time=TIME
    * Example: /recipes?rice&health=alcohol-free&health=dairy-free&cuisine=mexican

**Filters for recipes:**
* Diet Labels<br>
<img src=https://i.imgur.com/roY5Gci.png>
<br>
* Health Labels<br>
<img src=https://i.imgur.com/wy985IT.png>
<img src=https://i.imgur.com/FpnSkOu.png>
<img src=https://i.imgur.com/c0SBK8Z.png>
<br>
* Cuisine Type<br>
<img src=https://i.imgur.com/QK6yD7T.png>
<img src=https://i.imgur.com/Uy6gy8s.png>
<br>
* Meal Type<br>
<img src=https://i.imgur.com/bDGDUYH.png>
<br>
* Dish Type<br>
<img src=https://i.imgur.com/Nwt8fWB.png>
<img src=https://i.imgur.com/qzn4iak.png>
<br>
* Time
    * MIN%2B
    * MIN-MAX
    * MAX

* /grocery?zipcode=ZIPCODE
* /item?storeid=STOREID&q=QUERY


**APIs**

* [Edamam](https://developer.edamam.com/edamam-recipe-api)
* [Kroger](https://developer.kroger.com/reference/)
* [Lidl](https://mobileapi.lidl.com/v1/)

### Notes

Information about the data model and tags are available in `/info`