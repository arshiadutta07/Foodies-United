const mappings = require('./seed-data-uuid-mapping');

const cuisines = [
    { id: mappings['ITALIAN'], name: 'Italian', description: 'Cuisine characterized by its use of pasta, tomatoes, and a variety of herbs and cheeses.' },
    { id: mappings['MEXICAN'], name: 'Mexican', description: 'Cuisine known for its vibrant flavors, including the use of chili peppers, corn, and beans.' },
    { id: mappings['CHINESE'], name: 'Chinese', description: 'Cuisine famous for its diverse flavors and techniques, including stir-frying, steaming, and the use of soy sauce and ginger.' },
    { id: mappings['INDIAN'], name: 'Indian', description: 'Cuisine renowned for its rich use of spices, including curry, turmeric, and cumin, as well as a variety of regional dishes.' },
    { id: mappings['JAPANESE'], name: 'Japanese', description: 'Cuisine noted for its emphasis on fresh ingredients and simple preparation, including sushi, sashimi, and tempura.' },
    { id: mappings['THAI'], name: 'Thai', description: 'Cuisine known for its balance of sweet, sour, salty, and spicy flavors, often including ingredients like lemongrass, coconut milk, and chili.' },
    { id: mappings['FRENCH'], name: 'French', description: 'Cuisine celebrated for its emphasis on technique and presentation, including dishes like croissants, coq au vin, and crème brûlée.' },
    { id: mappings['SPANISH'], name: 'Spanish', description: 'Cuisine characterized by its use of olives, garlic, and spices, with famous dishes like paella, tapas, and churros.' },
    { id: mappings['AMERICAN'], name: 'American', description: 'Cuisine featuring a wide range of influences, including burgers, barbecue, and comfort foods like mac and cheese.' },
    { id: mappings['KOREAN'], name: 'Korean', description: 'Cuisine known for its bold flavors and dishes like kimchi, bulgogi, and bibimbap, often featuring fermented ingredients.' },
    { id: mappings['GREEK'], name: 'Greek', description: 'Cuisine famous for its use of olive oil, herbs, and dishes like moussaka, souvlaki, and tzatziki.' },
    { id: mappings['EASTERN EUROPEAN'], name: 'Eastern European', description: 'Cuisine with hearty, comforting dishes, often featuring ingredients like potatoes, cabbage, and meats, with dishes like pierogi and goulash.' }
];

module.exports = cuisines;