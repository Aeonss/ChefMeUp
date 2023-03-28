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
cost: Double  (cost to buy that product at the store)
itemizedCost: Double (cost per amount of that product)
```

### GroceryStore
```
name: String
logoUrl: String
distance: Double (miles)
address: String
```
