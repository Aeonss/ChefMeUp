// RecipeDetailView.tsx
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import RNViewShot from 'react-native-view-shot';

import {RecipesDetailViewProps} from './RecipeStackParams';

const labelView = (labels: string[]) => {
  return (
    <ScrollView
      style={styles.labelContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {labels.map(label => {
        return <Text style={styles.label}>{label}</Text>;
      })}
    </ScrollView>
  );
};

const RecipeDetailView = ({route, navigation}: RecipesDetailViewProps) => {
  //   const [takenScreenshot, setTakenScreenshot] = useState(false);
  const ref = useRef<RNViewShot>(null);
  //   useEffect(() => {
  //     if (takenScreenshot) return;
  //     setTakenScreenshot(true);
  //     setTimeout(() => {
  //       if (ref.current?.capture) ref.current?.capture();
  //     }, 5000);
  //   });
  const onCapture = useCallback((uri: string) => {
    console.log('do something with ', uri);
  }, []);
  navigation.setOptions({
    headerTitleStyle: {
      fontFamily: 'Poppins',
      fontWeight: '400',
    },
    headerBackTitle: ' ',
    headerTintColor: '#5dbb63',
  });
  const {recipe} = route.params;

  const [checkedIngredients, setCheckedIngredients] = useState(
    new Array(recipe.ingredients.length).fill(false),
  );

  const toggleIngredient = (index: number) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !checkedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  const openUrl = () => {
    const url = recipe.instructions;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  const headerInfo = [
    recipe.cuisineType,
    recipe.mealType,
    recipe.dietLabels,
  ].filter(a => a.length > 0);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <RNViewShot
          onCapture={onCapture}
          ref={ref}
          style={{backgroundColor: 'white', paddingHorizontal: 8}}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.subtitle}>{headerInfo.join(' • ')}</Text>
          <Image source={{uri: recipe.imageUrl}} style={styles.image} />
          <Text style={styles.sectionTitle}>Info</Text>
          {recipe.totalMinutes > 0 && (
            <View style={styles.infoContainer}>
              <Text style={styles.info}>Total Time:</Text>
              <Text style={styles.info}>{recipe.totalMinutes} minutes</Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Quantity:</Text>
            <Text style={styles.info}>{recipe.numberServings} servings</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Nutrition:</Text>
            <Text style={styles.info}>
              {Math.round(recipe.calories)} calories
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Instructions:</Text>
            <TouchableOpacity onPress={openUrl} style={styles.linkContainer}>
              <Text style={styles.link}>View instructions</Text>
              <Image
                source={require('../assets/bxs-link.png')}
                style={styles.linkImage}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Diet Labels</Text>
          {labelView(recipe.dietLabels)}
          <Text style={styles.sectionTitle}>Health Labels</Text>
          {labelView(recipe.healthLabels)}
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionSubtitle}>
            Select the ingredients that you would need to purchase.
          </Text>
          {recipe.ingredients.map((ingredient, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleIngredient(index)}>
              <View style={styles.ingredientContainer}>
                <View style={styles.checkboxContainer}>
                  {checkedIngredients[index] && (
                    <View style={styles.checkbox} />
                  )}
                </View>
                <Text style={styles.ingredientText}>
                  {Math.round(ingredient.amount * 100) / 100} {ingredient.unit}{' '}
                  {ingredient.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              const selectedIngredients = recipe.ingredients.filter(
                (ing, idx) => checkedIngredients[idx],
              );
              navigation.navigate('RecipePricesView', {
                selectedIngredients: selectedIngredients.map(i => i.name),
              });
            }}
            disabled={checkedIngredients.filter(a => a).length == 0}
            style={{
              opacity: checkedIngredients.filter(a => a).length == 0 ? 0.4 : 1,
            }}>
            <Text style={styles.button}>
              Check prices at your local grocery store
            </Text>
          </TouchableOpacity>
        </RNViewShot>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-semibold',
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
    fontFamily: 'Poppins-semibold',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 15,
  },
  info: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    // marginTop: 10,
    fontFamily: 'Poppins',
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#5dbb63',
    marginTop: 8,
    padding: 12,
    borderRadius: 22,
    overflow: 'hidden',
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 24,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 4,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    opacity: 0.8,
    marginBottom: 16,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5dbb63',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#5dbb63',
  },
  ingredientText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#5dbb63',
    fontWeight: '700',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkImage: {
    height: 20,
    width: 20,
    marginLeft: 4,
    tintColor: '#5dbb63',
  },
  label: {
    backgroundColor: 'rgba(93, 187, 99, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
    verticalAlign: 'middle',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  labelContainer: {},
});

export default RecipeDetailView;
