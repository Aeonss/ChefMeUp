import { Recipe } from "../model/Recipe";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GroceriesStackParam = {
  RecipeGroceriesView: undefined;
  RecipePricesView: {selectedIngredients: string[]}
};

export type RecipesGroceriesViewProps = NativeStackScreenProps<GroceriesStackParam, 'RecipeGroceriesView'>;
export type GroceryPricesViewProps = NativeStackScreenProps<GroceriesStackParam, 'RecipePricesView'>;
