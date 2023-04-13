import { Ingredient } from "./Ingredient"

enum MealType {
    Breakfast = "breakfast",
    Lunch = "lunch",
    Dinner = "dinner",
    Snack = "snack",
    Dessert = "dessert"
  }
  
  enum DishType {
    MainCourse = "main course",
    SideDish = "side dish",
    Appetizer = "appetizer",
    Salad = "salad",
    Soup = "soup",
    Beverage = "beverage",
    Sauce = "sauce",
    Bread = "bread",
    Dessert = "dessert"
  }
  
  enum CuisineType {
    American = "american",
    Italian = "italian",
    Asian = "asian",
    Mexican = "mexican",
    Indian = "indian",
    Mediterranean = "mediterranean",
    French = "french",
    Caribbean = "caribbean",
    Japanese = "japanese",
    Chinese = "chinese",
    Thai = "thai",
    Greek = "greek",
    Korean = "korean",
    Vietnamese = "vietnamese"
  }
  
  enum DietLabel {
    Balanced = "balanced",
    HighFiber = "high-fiber",
    HighProtein = "high-protein",
    LowCarb = "low-carb",
    LowFat = "low-fat",
    LowSodium = "low-sodium"
  }
  
  enum HealthLabel {
    AlcoholCocktail = "alcohol-cocktail",
    AlcoholFree = "alcohol-free",
    CeleryFree = "celery-free",
    CrustaceanFree = "crustacean-free",
    DairyFree = "dairy-free",
    DASH = "DASH",
    EggFree = "egg-free",
    FishFree = "fish-free",
    FODMAPFree = "fodmap-free",
    GlutenFree = "gluten-free",
    ImmunoSupportive = "immuno-supportive",
    KetoFriendly = "keto-friendly",
    KidneyFriendly = "kidney-friendly",
    Kosher = "kosher",
    LowPotassium = "low-potassium",
    LowSugar = "low-sugar",
    LupineFree = "lupine-free",
    Mediterranean = "Mediterranean",
    MolluskFree = "mollusk-free",
    MustardFree = "mustard-free",
    NoOilAdded = "no-oil-added",
    Paleo = "paleo",
    PeanutFree = "peanut-free",
    Pescatarian = "pescatarian",
    PorkFree = "pork-free",
    RedMeatFree = "red-meat-free",
    SesameFree = "sesame-free",
    ShellfishFree = "shellfish-free",
    SoyFree = "soy-free",
    SugarConscious = "sugar-conscious",
    SulfiteFree = "sulfite-free",
    TreeNutFree = "tree-nut-free",
    Vegan = "vegan",
    Vegetarian = "vegetarian",
    WheatFree = "wheat-free"
  }
  

export interface Recipe {
    id: number,
    name: string,
    sourceUrl: string,
    imageUrl: string
    totalMinutes: number,
    totalCost: number,
    mealType: MealType,
    dishType: DishType,
    cuisineType: CuisineType,
    dietLabels: DietLabel[],
    healthLabels: HealthLabel[],
    calories: number,
    numberServings: number,
    ingredients: Ingredient[],
    instructionsUrl: String
}
