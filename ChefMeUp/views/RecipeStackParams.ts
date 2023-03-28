import { Recipe } from "../model/Recipe";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RecipeStackParam = {
  RecipesView: undefined;
  RecipeDetailView: {recipe: Recipe};
};

export type RecipesViewProps = NativeStackScreenProps<RecipeStackParam, 'RecipesView'>;
export type RecipesDetailViewProps = NativeStackScreenProps<RecipeStackParam, 'RecipeDetailView'>;
