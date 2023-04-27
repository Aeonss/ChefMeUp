import { Ingredient } from "../model/Ingredient";
import { Recipe } from "../model/Recipe";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RecipeStackParam = {
  RecipesView: undefined;
  RecipeDetailView: {recipe: Recipe};
  RecipePricesView: {selectedIngredients: string[]};
};

export type RecipesViewProps = NativeStackScreenProps<RecipeStackParam, 'RecipesView'>;
export type RecipesDetailViewProps = NativeStackScreenProps<RecipeStackParam, 'RecipeDetailView'>;
export type RecipePricesViewProps = NativeStackScreenProps<RecipeStackParam, 'RecipePricesView'>;


