 export const proteinSources = [
  {
    "name": "Vegetarian",
    "id": "veg",
    "sources": [
      {
        "id": "paneer",
        "name": "Paneer",
        "isVeg": true
      },
      {
        "id": "tofu",
        "name": "Tofu",
        "isVeg": true
      }
    ]
  },
  {
    "name": "Non vegetarian",
    "id": "non-veg",
    "sources": [
      {
        "id": "chicken-breast",
        "name": "Chicken breast",
        "isVeg": false
      },
      {
        "id": "basa-fish",
        "name": "Basa fish",
        "isVeg": false
      },
      {
        "id": "salmon-fish",
        "name": "Salmon fish",
        "isVeg": false
      },
      {
        "id": "tilapia-fish",
        "name": "Tilapia fish",
        "isVeg": false
      }
    ]
  }
]

 export const fatSources = [
  {
    "name": "Nuts",
    "id": "nuts",
    "sources": [
      {
        "id": "almonds",
        "name": "Almonds",
        "isVeg": true
      },
      {
        "id": "walnuts",
        "name": "Walnuts",
        "isVeg": true
      }
    ]
  },
  {
    "name": "Dairy",
    "id": "dairy",
    "sources": [
      {
        "id": "whole-egg",
        "name": "Whole Egg",
        "isVeg": false
      },
      {
        "id": "cheese",
        "name": "Cheese",
        "isVeg": false
      },
      {
        "id": "dark-chocolate",
        "name": "Dark Chocolate",
        "isVeg": false
      },
    ]
  },
  {
    "name": "Vegetables",
    "id": "vegetables",
    "sources": [
      {
        "id": "avocado",
        "name": "Avocado",
        "isVeg": true
      },
      {
        "id": "olives",
        "name": "Olives",
        "isVeg": true
      }
    ]
  },
]

 export const carbSources = [
  {
    "name": "Breads",
    "id": "breads",
    "sources": [
      {
        "id": "white-bread",
        "name": "White bread",
        "isVeg": true
      },
      {
        "id": "wheat-bread",
        "name": "Wheat Bread",
        "isVeg": true
      }
    ]
  },
  {
    "name": "Grains",
    "id": "grains",
    "sources": [
      {
        "id": "white-rice",
        "name": "White rice",
        "isVeg": true
      },
      {
        "id": "brown-rice",
        "name": "Brown Rice",
        "isVeg": true
      },
      {
        "id": "wheat",
        "name": "Wheat",
        "isVeg": true
      },
    ]
  },
  {
    "name": "Vegetables",
    "id": "vegetables",
    "sources": [
      {
        "id": "white-potato",
        "name": "White Potato",
        "isVeg": true
      },
      {
        "id": "sweet-potato",
        "name": "Sweet Potato",
        "isVeg": true
      }
    ]
  },
]

const selectedProteinSources = [
  {
    key: "chicken-breast",
    value: {
      fat: 4,
      isStandardForBeginner: true,
      isVeg: false,
      name: "Chicken breast",
      protein: 31
    }
  },
 /*{
    key: "egg-white",
    value: {
      "isStandardForBeginner" : true,
      "isVeg" : false,
      "name" : "Egg White",
      "protein" : 4
    }
  },
  {
    key: "egg-whole",
    value: {
      "carbs" : 0,
      "fat" : 4.5,
      "isStandardForBeginner" : true,
      "isVeg" : false,
      "name" : "Whole Egg",
      "protein" : 6
    }
  }, */
  {
    key: "rajma",
    value: {
      "carbs" : 23,
      "isStandardForBeginner" : true,
      "isVeg" : true,
      "name" : "Rajma",
      "protein" : 9
    }
  } 
];

module.exports = selectedProteinSources;


