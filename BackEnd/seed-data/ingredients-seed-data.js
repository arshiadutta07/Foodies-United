const mappings = require('./seed-data-uuid-mapping');
const ingredients = [
    // Vegetables
    { id: mappings['TOMATO'], name: 'Tomato', category_id: mappings['VEGETABLES'], description: 'A juicy, red fruit used in salads, sauces, and many other dishes.' },
    { id: mappings['CARROT'], name: 'Carrot', category_id: mappings['VEGETABLES'], description: 'A crunchy, orange root vegetable often used in soups, salads, and as a snack.' },
    { id: mappings['SPINACH'], name: 'Spinach', category_id: mappings['VEGETABLES'], description: 'A leafy green vegetable rich in iron, commonly used in salads and cooking.' },
  
    // Fruits
    { id: mappings['APPLE'], name: 'Apple', category_id: mappings['FRUITS'], description: 'A sweet, crisp fruit often eaten raw or used in desserts and salads.' },
    { id: mappings['BANANA'], name: 'Banana', category_id: mappings['FRUITS'], description: 'A soft, sweet fruit that is commonly eaten as a snack or used in smoothies and baking.' },
    { id: mappings['STRAWBERRY'], name: 'Strawberry', category_id: mappings['FRUITS'], description: 'A small, red fruit with a sweet taste, used in desserts, salads, and jams.' },
  
    // Spices
    { id: mappings['BLACK PEPPER'], name: 'Black Pepper', category_id: mappings['SPICES'], description: 'A pungent spice made from peppercorns, used to add heat and flavor to dishes.' },
    { id: mappings['CUMIN'], name: 'Cumin', category_id: mappings['SPICES'], description: 'A spice with a warm, earthy flavor, commonly used in curries and stews.' },
    { id: mappings['TURMERIC'], name: 'Turmeric', category_id: mappings['SPICES'], description: 'A bright yellow spice known for its earthy flavor and use in curry powders.' },
  
    // Herbs
    { id: mappings['BASIL'], name: 'Basil', category_id: mappings['HERBS'], description: 'A fragrant herb used in Italian cuisine, particularly in pesto and tomato-based dishes.' },
    { id: mappings['CILANTRO'], name: 'Cilantro', category_id: mappings['HERBS'], description: 'An herb with a fresh, citrusy flavor, commonly used in Mexican and Asian cuisines.' },
    { id: mappings['ROSEMARY'], name: 'Rosemary', category_id: mappings['HERBS'], description: 'An aromatic herb with a pine-like flavor, often used to season meats and roasted vegetables.' },
  
    // Dairy
    { id: mappings['CHEDDAR CHEESE'], name: 'Cheddar Cheese', category_id: mappings['DAIRY'], description: 'A sharp, hard cheese used in a variety of dishes, including sandwiches and casseroles.' },
    { id: mappings['MILK'], name: 'Milk', category_id: mappings['DAIRY'], description: 'A liquid dairy product used for drinking, cooking, and baking.' },
    {  id: mappings['YOGURT'],name: 'Yogurt', category_id: mappings['DAIRY'], description: 'A fermented dairy product often eaten on its own or used in sauces and dressings.' },
  
    // Grains
    { id: mappings['RICE'], name: 'Rice', category_id: mappings['GRAINS'], description: 'A staple grain used in a variety of dishes, including stir-fries and sushi.' },
    { id: mappings['WHEAT FLOUR'], name: 'Wheat Flour', category_id: mappings['GRAINS'], description: 'A common flour used in baking bread, pastries, and other baked goods.' },
    { id: mappings['OATS'], name: 'Oats', category_id: mappings['GRAINS'], description: 'A versatile grain used in breakfast cereals, granola, and baking.' },
  
    // Proteins
    { id: mappings['CHICKEN'], name: 'Chicken', category_id: mappings['PROTEINS'], description: 'A lean meat used in a variety of dishes, including salads, stir-fries, and grilled entrees.' },
    { id: mappings['TOFU'], name: 'Tofu', category_id: mappings['PROTEINS'], description: 'A plant-based protein made from soybeans, used in vegetarian and vegan dishes.' },
    { id: mappings['LENTILS'], name: 'Lentils', category_id: mappings['PROTEINS'], description: 'A type of legume that is high in protein and used in soups, stews, and salads.' },
  
    // Oils & Fats
    { id: mappings['OLIVE OIL'], name: 'Olive Oil', category_id: mappings['OILS & FATS'], description: 'A heart-healthy oil used for cooking and salad dressings.' },
    { id: mappings['BUTTER'], name: 'Butter', category_id: mappings['OILS & FATS'], description: 'A dairy fat used in baking, cooking, and as a spread.' },
    { id: mappings['COCONUT OIL'], name: 'Coconut Oil', category_id: mappings['OILS & FATS'], description: 'An oil derived from coconuts, used for cooking and in baking.' },
  
    // Sweeteners
    { id: mappings['SUGAR'], name: 'Sugar', category_id: mappings['SWEETENERS'], description: 'A sweet substance used in baking and cooking to add sweetness to dishes.' },
    { id: mappings['HONEY'], name: 'Honey', category_id: mappings['SWEETENERS'], description: 'A natural sweetener produced by bees, used in tea, baking, and as a spread.' },
    { id: mappings['MAPLE SYRUP'], name: 'Maple Syrup', category_id: mappings['SWEETENERS'], description: 'A sweet syrup made from maple tree sap, often used on pancakes and in recipes.' },
  
    // Condiments
    { id: mappings['KETCHUP'], name: 'Ketchup', category_id: mappings['CONDIMENTS'], description: 'A tomato-based sauce used as a condiment for burgers, fries, and other foods.' },
    { id: mappings['MUSTARD'], name: 'Mustard', category_id: mappings['CONDIMENTS'], description: 'A tangy condiment made from mustard seeds, used in sandwiches and dressings.' },
    { id: mappings['SOY_SAUCE'] ,name: 'Soy Sauce', category_id: mappings['CONDIMENTS'], description: 'A salty sauce made from fermented soybeans, commonly used in Asian cuisine.' }
  ];
  
module.exports = ingredients;