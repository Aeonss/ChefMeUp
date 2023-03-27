# Data Model

For synchronization purposes, update this any time the data model from the frontend or backend changes.

### Recipe
```
id: String
name: String
sourceUrl: String
imageUrl: String
totalMinutes: Int
totalCost: Double
numberServings: Int
ingredients: Ingredient[]
instructions: Instruction[]
```

### Ingredient
```
name: String
amount: Double
unit: String
```

### Instruction
```
step: Int
description: String
```

### PricedIngredient
```
ingredient: Ingredient
prices: PuchaseOption[]
```

### PurchaseOption
```
store: GroceryStore
cost: Double
```

### GroceryStore
```
Enumeration: SAFEWAY, KROGER, WALMART
```
