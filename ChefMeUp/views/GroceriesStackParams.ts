import { Recipe } from "../model/Recipe";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GroceriesStackParam = {
  RecipeGroceriesView: undefined;
};

export type RecipesGroceriesViewProps = NativeStackScreenProps<GroceriesStackParam, 'RecipeGroceriesView'>;

