import { Ingredient } from "./Ingredient"

export interface Recipe {
    id: number,
    name: string,
    sourceUrl: string,
    imageUrl: string
    totalMinutes: number,
    totalCost: number,
    mealType: string,
    dishType: string,
    cuisineType: string,
    dietLabels: string[],
    healthLabels: string[],
    calories: number,
    numberServings: number,
    ingredients: Ingredient[],
    instructionsUrl: String
}