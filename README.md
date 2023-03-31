# ChefMeUp

### Frontend

To run the React Native app, perform the following:

Install [React Native](https://reactnative.dev/docs/environment-setup?guide=native). Make sure the ANDROID_HOME environmental variable is set. A system restart may be necessary.

Install [Android Studio](https://developer.android.com/studio)

[Create a virtual device on Android Studio](https://developer.android.com/studio/run/managing-avds)

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
* /grocery?zipcode=ZIPCODE
* /item?storeid=STOREID&q=QUERY


**APIs**

* [Edamam](https://developer.edamam.com/edamam-recipe-api)
* [Kroger](https://developer.kroger.com/reference/)
* [Lidl](https://mobileapi.lidl.com/v1/)

### Notes

Information about the data model and tags are available in `/info`