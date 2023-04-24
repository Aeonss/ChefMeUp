# enum CuisineType {
#   American = 'american',
#   Italian = 'italian',
#   Asian = 'asian',
#   Mexican = 'mexican',
#   Indian = 'indian',
#   Mediterranean = 'mediterranean',
#   French = 'french',
#   Caribbean = 'caribbean',
#   Japanese = 'japanese',
#   Chinese = 'chinese',
#   Thai = 'thai',
#   Greek = 'greek',
#   Korean = 'korean',
#   Vietnamese = 'vietnamese',
# }

inputs = ['american', 'italian', 'asian', 'mexican', 'indian', 'mediterranean', 'french', 'caribbean', 'japanese', 'chinese', 'thai', 'greek', 'korean', 'vietnamese']

all = []
for i in inputs:
    all.append("{key: '" + i.capitalize() + "', value: '" + i + "'}")
print(",\n".join(all))