// Comprehensive Pokemon database with game availability
// Data sourced from VGC regulations and Smogon tiers

export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  availableIn: string[];
}

// Popular competitive Pokemon with their availability
// VGC Reg I = Paldea/Kitakami/Blueberry dex
// VGC Reg H = Same but bans Paradox/Legendaries
// Pokemon Champions = 263 Pokemon including Mega Evolutions
// Smogon OU = Gen 9 OverUsed tier

export const POKEMON_DATABASE: PokemonData[] = [
  // Gen 9 Starters
  { id: 906, name: 'Sprigatito', types: ['Grass'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 907, name: 'Floragato', types: ['Grass'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 908, name: 'Meowscarada', types: ['Grass', 'Dark'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 909, name: 'Fuecoco', types: ['Fire'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 910, name: 'Crocalor', types: ['Fire'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 911, name: 'Skeledirge', types: ['Fire', 'Ghost'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 912, name: 'Quaxly', types: ['Water'], abilities: ['Torrent', 'Moxie'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 913, name: 'Quaxwell', types: ['Water'], abilities: ['Torrent', 'Moxie'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 914, name: 'Quaquaval', types: ['Water', 'Fighting'], abilities: ['Torrent', 'Moxie'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },

  // Popular VGC Pokemon
  { id: 727, name: 'Incineroar', types: ['Fire', 'Dark'], abilities: ['Blaze', 'Intimidate'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 812, name: 'Rillaboom', types: ['Grass'], abilities: ['Overgrow', 'Grassy Surge'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 892, name: 'Urshifu', types: ['Fighting', 'Dark'], abilities: ['Unseen Fist'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 59, name: 'Arcanine', types: ['Fire'], abilities: ['Intimidate', 'Flash Fire'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },

  // Paradox Pokemon (not in Reg H)
  { id: 987, name: 'Flutter Mane', types: ['Ghost', 'Fairy'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 992, name: 'Iron Hands', types: ['Fighting', 'Electric'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1007, name: 'Koraidon', types: ['Fighting', 'Dragon'], abilities: ['Orichalcum Pulse'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1008, name: 'Miraidon', types: ['Electric', 'Dragon'], abilities: ['Hadron Engine'], availableIn: ['vgc-reg-i', 'smogon-ou'] },

  // Paldea Pokemon
  { id: 979, name: 'Annihilape', types: ['Fighting', 'Ghost'], abilities: ['Vital Spirit', 'Inner Focus'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 972, name: 'Houndstone', types: ['Ghost'], abilities: ['Sand Rush', 'Fluffy'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 931, name: 'Squawkabilly', types: ['Normal', 'Flying'], abilities: ['Intimidate', 'Hustle'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 964, name: 'Palafin', types: ['Water'], abilities: ['Zero to Hero'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 1000, name: 'Gholdengo', types: ['Steel', 'Ghost'], abilities: ['Good as Gold'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 983, name: 'Kingambit', types: ['Dark', 'Steel'], abilities: ['Defiant', 'Supreme Overlord'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 945, name: 'Grafaiai', types: ['Poison', 'Normal'], abilities: ['Unburden', 'Poison Touch'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 920, name: 'Lokix', types: ['Bug', 'Dark'], abilities: ['Swarm', 'Tinted Lens'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 998, name: 'Baxcalibur', types: ['Dragon', 'Ice'], abilities: ['Thermal Exchange', 'Ice Body'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 923, name: 'Pawmot', types: ['Electric', 'Fighting'], abilities: ['Volt Absorb', 'Natural Cure'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 976, name: 'Veluza', types: ['Water', 'Psychic'], abilities: ['Mold Breaker', 'Sharpness'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 936, name: 'Armarouge', types: ['Fire', 'Psychic'], abilities: ['Flash Fire', 'Weak Armor'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 937, name: 'Ceruledge', types: ['Fire', 'Ghost'], abilities: ['Flash Fire', 'Weak Armor'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 954, name: 'Brambleghast', types: ['Grass', 'Ghost'], abilities: ['Wind Rider', 'Infiltrator'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 996, name: 'Frigibax', types: ['Dragon', 'Ice'], abilities: ['Thermal Exchange', 'Ice Body'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 997, name: 'Arctibax', types: ['Dragon', 'Ice'], abilities: ['Thermal Exchange', 'Ice Body'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },

  // Returning Pokemon
  { id: 6, name: 'Charizard', types: ['Fire', 'Flying'], abilities: ['Blaze', 'Solar Power'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 445, name: 'Garchomp', types: ['Dragon', 'Ground'], abilities: ['Sand Veil', 'Rough Skin'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 149, name: 'Dragonite', types: ['Dragon', 'Flying'], abilities: ['Inner Focus', 'Multiscale'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 645, name: 'Landorus', types: ['Ground', 'Flying'], abilities: ['Sand Force', 'Intimidate'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 25, name: 'Pikachu', types: ['Electric'], abilities: ['Static', 'Lightning Rod'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 26, name: 'Raichu', types: ['Electric'], abilities: ['Static', 'Lightning Rod'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 94, name: 'Gengar', types: ['Ghost', 'Poison'], abilities: ['Cursed Body'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 257, name: 'Blaziken', types: ['Fire', 'Fighting'], abilities: ['Blaze', 'Speed Boost'], availableIn: ['pokemon-champions'] },
  { id: 658, name: 'Greninja', types: ['Water', 'Dark'], abilities: ['Torrent', 'Protean'], availableIn: ['pokemon-champions', 'smogon-ou'] },
  { id: 663, name: 'Talonflame', types: ['Fire', 'Flying'], abilities: ['Flame Body', 'Gale Wings'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
  { id: 591, name: 'Amoonguss', types: ['Grass', 'Poison'], abilities: ['Effect Spore', 'Regenerator'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 324, name: 'Torkoal', types: ['Fire'], abilities: ['White Smoke', 'Drought'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 663, name: 'Talonflame', types: ['Fire', 'Flying'], abilities: ['Flame Body', 'Gale Wings'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
  { id: 547, name: 'Whimsicott', types: ['Grass', 'Fairy'], abilities: ['Prankster', 'Infiltrator'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 983, name: 'Kingambit', types: ['Dark', 'Steel'], abilities: ['Defiant', 'Supreme Overlord'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 911, name: 'Skeledirge', types: ['Fire', 'Ghost'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },

  // More common competitive picks
  { id: 637, name: 'Volcarona', types: ['Bug', 'Fire'], abilities: ['Flame Body', 'Swarm'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 212, name: 'Scizor', types: ['Bug', 'Steel'], abilities: ['Swarm', 'Technician'], availableIn: ['pokemon-champions', 'smogon-ou'] },
  { id: 887, name: 'Dragapult', types: ['Dragon', 'Ghost'], abilities: ['Clear Body', 'Infiltrator'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 452, name: 'Drapion', types: ['Poison', 'Dark'], abilities: ['Battle Armor', 'Sniper'], availableIn: ['vgc-reg-h'] },
  { id: 911, name: 'Skeledirge', types: ['Fire', 'Ghost'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 184, name: 'Azumarill', types: ['Water', 'Fairy'], abilities: ['Thick Fat', 'Huge Power'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 890, name: 'Eternatus', types: ['Poison', 'Dragon'], abilities: ['Pressure'], availableIn: ['vgc-reg-i'] },

  // Pokemon Champions exclusives (with Mega Evolutions)
  { id: 3, name: 'Venusaur', types: ['Grass', 'Poison'], abilities: ['Overgrow', 'Chlorophyll'], availableIn: ['pokemon-champions'] },
  { id: 9, name: 'Blastoise', types: ['Water'], abilities: ['Torrent', 'Rain Dish'], availableIn: ['pokemon-champions'] },
  { id: 154, name: 'Meganium', types: ['Grass'], abilities: ['Overgrow', 'Leaf Guard'], availableIn: ['pokemon-champions'] },
  { id: 160, name: 'Feraligatr', types: ['Water'], abilities: ['Torrent', 'Sheer Force'], availableIn: ['pokemon-champions'] },
  { id: 157, name: 'Typhlosion', types: ['Fire'], abilities: ['Blaze', 'Flash Fire'], availableIn: ['pokemon-champions'] },
  { id: 282, name: 'Gardevoir', types: ['Psychic', 'Fairy'], abilities: ['Synchronize', 'Trace'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 376, name: 'Metagross', types: ['Steel', 'Psychic'], abilities: ['Clear Body', 'Light Metal'], availableIn: ['pokemon-champions', 'smogon-ou'] },
  { id: 448, name: 'Lucario', types: ['Fighting', 'Steel'], abilities: ['Steadfast', 'Inner Focus'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 121, name: 'Starmie', types: ['Water', 'Psychic'], abilities: ['Illuminate', 'Natural Cure'], availableIn: ['pokemon-champions'] },

  // Top Smogon OU threats
  { id: 888, name: 'Zacian', types: ['Fairy', 'Steel'], abilities: ['Intrepid Sword'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 889, name: 'Zamazenta', types: ['Fighting', 'Steel'], abilities: ['Dauntless Shield'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1003, name: 'Ting-Lu', types: ['Dark', 'Ground'], abilities: ['Vessel of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1004, name: 'Chien-Pao', types: ['Dark', 'Ice'], abilities: ['Sword of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1005, name: 'Wo-Chien', types: ['Dark', 'Grass'], abilities: ['Tablets of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1006, name: 'Chi-Yu', types: ['Dark', 'Fire'], abilities: ['Beads of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 984, name: 'Great Tusk', types: ['Ground', 'Fighting'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 990, name: 'Iron Treads', types: ['Ground', 'Steel'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 994, name: 'Iron Moth', types: ['Fire', 'Poison'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 991, name: 'Iron Bundle', types: ['Ice', 'Water'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1001, name: 'Wo-Chien', types: ['Dark', 'Grass'], abilities: ['Tablets of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },

  // More Paldea staples
  { id: 967, name: 'Cyclizar', types: ['Dragon', 'Normal'], abilities: ['Shed Skin', 'Regenerator'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 947, name: 'Brambleghast', types: ['Grass', 'Ghost'], abilities: ['Wind Rider', 'Infiltrator'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 980, name: 'Clodsire', types: ['Poison', 'Ground'], abilities: ['Poison Point', 'Water Absorb'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 952, name: 'Scovillain', types: ['Grass', 'Fire'], abilities: ['Chlorophyll', 'Insomnia'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 981, name: 'Dondozo', types: ['Water'], abilities: ['Unaware', 'Oblivious'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 978, name: 'Tatsugiri', types: ['Dragon', 'Water'], abilities: ['Commander', 'Storm Drain'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
];

export const NATURES = [
  'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty',
  'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
  'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive',
  'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
  'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'
];

export const ITEMS = [
  'None',
  'Assault Vest', 'Choice Band', 'Choice Scarf', 'Choice Specs',
  'Focus Sash', 'Life Orb', 'Leftovers', 'Sitrus Berry',
  'Safety Goggles', 'Rocky Helmet', 'Heavy-Duty Boots',
  'Weakness Policy', 'Covert Cloak', 'Mirror Herb',
  'Clear Amulet', 'Booster Energy', 'Loaded Dice',
  'Wide Lens', 'Metronome', 'Expert Belt',
  'Muscle Band', 'Wise Glasses', 'Quick Claw',
  'Kings Rock', 'Scope Lens', 'Mental Herb',
  'White Herb', 'Power Herb', 'Bright Powder',
  'Eviolite', 'Air Balloon', 'Red Card',
  'Eject Button', 'Flame Orb', 'Toxic Orb'
];
