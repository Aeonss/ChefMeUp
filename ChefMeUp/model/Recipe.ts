import { Ingredient } from "./Ingredient"
import { Instruction } from "./Instruction"

export interface Recipe {
    id: number,
    name: string,
    imageUrl: string
    totalMinutes: number,
    totalCost: number,
    numberServings: number,
    ingredients: Ingredient[],
    instructions: Instruction[]
}