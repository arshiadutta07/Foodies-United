const mappings = require('./seed-data-uuid-mapping');

const categories = [
    { id: mappings['VEGETABLES'], name: 'Vegetables', description: 'Plant-based foods that are typically used as the primary components of dishes or as side ingredients.' },
    { id: mappings['FRUITS'], name: 'Fruits', description: 'Edible products of flowering plants that are often sweet or tart. Used in both savory and sweet dishes, as well as for juices and desserts.' },
    { id: mappings['SPICES'], name: 'Spices', description: 'Flavoring substances derived from seeds, fruits, roots, bark, or other plant parts. Used in small amounts to enhance the flavor and aroma of dishes.' },
    { id: mappings['HERBS'], name: 'Herbs', description: 'Leafy green plants used for flavoring, garnishing, or medicinal purposes. They are often used fresh or dried.' },
    { id: mappings['DAIRY'], name: 'Dairy', description: 'Products made from the milk of mammals. Includes items like cheese, milk, and yogurt, often used in cooking and baking.' },
    { id: mappings['GRAINS'], name: 'Grains', description: 'Edible seeds from cereal crops such as wheat, rice, barley, and oats. Often used as the base for many dishes and as a staple food.' },
    { id: mappings['PROTEINS'], name: 'Proteins', description: 'Ingredients rich in protein such as meat, poultry, fish, tofu, and legumes. Essential for building and repairing tissues.' },
    { id: mappings['OILS & FATS'], name: 'Oils & Fats', description: 'Ingredients used for cooking or flavoring, including various vegetable oils, butter, and animal fats. They are essential for frying, baking, and adding richness to dishes.' },
    { id: mappings['SWEETENERS'], name: 'Sweeteners', description: 'Substances used to add sweetness to dishes, including sugar, honey, syrups, and artificial sweeteners.' },
    { id: mappings['CONDIMENTS'], name: 'Condiments', description: 'Sauces or seasonings added to dishes to enhance flavor, including items like ketchup, mustard, soy sauce, and vinegar.' }
  ];

module.exports = categories;