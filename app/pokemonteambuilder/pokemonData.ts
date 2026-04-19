// Comprehensive Pokemon database with game availability
// Data sourced from VGC regulations and Smogon tiers

export interface EVSpread {
  name: string;
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
  description: string;
}

export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  availableIn: string[];
  commonSpreads?: EVSpread[];
}

// Popular competitive Pokemon with their availability
// VGC Reg I = Paldea/Kitakami/Blueberry dex + 2 Restricted
// VGC Reg H = Same but bans Paradox/Legendaries
// Pokemon Champions = 263 Pokemon including Mega Evolutions
// Smogon OU = Gen 9 OverUsed tier

export const POKEMON_DATABASE: PokemonData[] = [
  // Gen 9 Starters
  { id: 906, name: 'Sprigatito', types: ['Grass'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 907, name: 'Floragato', types: ['Grass'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  {
    id: 908,
    name: 'Meowscarada',
    types: ['Grass', 'Dark'],
    abilities: ['Overgrow', 'Protean'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'],
    commonSpreads: [
      { name: 'Fast Attacker', hp: 0, atk: 252, def: 0, spa: 4, spd: 0, spe: 252, description: 'Max Speed/Attack for physical sweeper' },
      { name: 'Mixed Attacker', hp: 0, atk: 100, def: 0, spa: 156, spd: 0, spe: 252, description: 'Mixed offensive set' }
    ]
  },
  { id: 909, name: 'Fuecoco', types: ['Fire'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 910, name: 'Crocalor', types: ['Fire'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  {
    id: 911,
    name: 'Skeledirge',
    types: ['Fire', 'Ghost'],
    abilities: ['Blaze', 'Unaware'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Pivot', hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0, description: 'Tank with max HP and SpA' },
      { name: 'Trick Room', hp: 252, atk: 0, def: 4, spa: 252, spd: 0, spe: 0, description: 'Minimum Speed for Trick Room' }
    ]
  },
  { id: 912, name: 'Quaxly', types: ['Water'], abilities: ['Torrent', 'Moxie'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 913, name: 'Quaxwell', types: ['Water'], abilities: ['Torrent', 'Moxie'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  {
    id: 914,
    name: 'Quaquaval',
    types: ['Water', 'Fighting'],
    abilities: ['Torrent', 'Moxie'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'],
    commonSpreads: [
      { name: 'Physical Sweeper', hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252, description: 'Fast physical attacker' }
    ]
  },

  // Restricted Legendaries (Reg I allowed)
  {
    id: 1007,
    name: 'Koraidon',
    types: ['Fighting', 'Dragon'],
    abilities: ['Orichalcum Pulse'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Fast Attacker', hp: 12, atk: 252, def: 0, spa: 0, spd: 4, spe: 236, description: 'Outspeeds +1 base 100s' },
      { name: 'Bulky Attacker', hp: 196, atk: 252, def: 0, spa: 0, spd: 60, spe: 0, description: 'Bulky physical attacker' }
    ]
  },
  {
    id: 1008,
    name: 'Miraidon',
    types: ['Electric', 'Dragon'],
    abilities: ['Hadron Engine'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Fast Special Attacker', hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252, description: 'Max Speed/SpA sweeper' }
    ]
  },
  { id: 888, name: 'Zacian', types: ['Fairy', 'Steel'], abilities: ['Intrepid Sword'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  {
    id: 889,
    name: 'Zamazenta',
    types: ['Fighting', 'Steel'],
    abilities: ['Dauntless Shield'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Defensive Pivot', hp: 252, atk: 92, def: 132, spa: 0, spd: 0, spe: 28, description: 'Bulky physical wall' }
    ]
  },
  { id: 890, name: 'Eternatus', types: ['Poison', 'Dragon'], abilities: ['Pressure'], availableIn: ['vgc-reg-i'] },
  { id: 898, name: 'Calyrex', types: ['Psychic', 'Grass'], abilities: ['Unnerve'], availableIn: ['vgc-reg-i'] },
  { id: 150, name: 'Mewtwo', types: ['Psychic'], abilities: ['Pressure', 'Unnerve'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 249, name: 'Lugia', types: ['Psychic', 'Flying'], abilities: ['Pressure', 'Multiscale'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 250, name: 'Ho-Oh', types: ['Fire', 'Flying'], abilities: ['Pressure', 'Regenerator'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 382, name: 'Kyogre', types: ['Water'], abilities: ['Drizzle'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 383, name: 'Groudon', types: ['Ground'], abilities: ['Drought'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 384, name: 'Rayquaza', types: ['Dragon', 'Flying'], abilities: ['Air Lock'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 483, name: 'Dialga', types: ['Steel', 'Dragon'], abilities: ['Pressure', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 484, name: 'Palkia', types: ['Water', 'Dragon'], abilities: ['Pressure', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 487, name: 'Giratina', types: ['Ghost', 'Dragon'], abilities: ['Pressure', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 643, name: 'Reshiram', types: ['Dragon', 'Fire'], abilities: ['Turboblaze'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 644, name: 'Zekrom', types: ['Dragon', 'Electric'], abilities: ['Teravolt'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 646, name: 'Kyurem', types: ['Dragon', 'Ice'], abilities: ['Pressure'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 716, name: 'Xerneas', types: ['Fairy'], abilities: ['Fairy Aura'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 717, name: 'Yveltal', types: ['Dark', 'Flying'], abilities: ['Dark Aura'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 791, name: 'Solgaleo', types: ['Psychic', 'Steel'], abilities: ['Full Metal Body'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 792, name: 'Lunala', types: ['Psychic', 'Ghost'], abilities: ['Shadow Shield'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 800, name: 'Necrozma', types: ['Psychic'], abilities: ['Prism Armor'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },

  // Treasures of Ruin
  { id: 1003, name: 'Ting-Lu', types: ['Dark', 'Ground'], abilities: ['Vessel of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  {
    id: 1004,
    name: 'Chien-Pao',
    types: ['Dark', 'Ice'],
    abilities: ['Sword of Ruin'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Glass Cannon', hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252, description: 'Maximum offensive pressure' }
    ]
  },
  { id: 1005, name: 'Wo-Chien', types: ['Dark', 'Grass'], abilities: ['Tablets of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1006, name: 'Chi-Yu', types: ['Dark', 'Fire'], abilities: ['Beads of Ruin'], availableIn: ['vgc-reg-i', 'smogon-ou'] },

  // Paradox Pokemon
  {
    id: 987,
    name: 'Flutter Mane',
    types: ['Ghost', 'Fairy'],
    abilities: ['Protosynthesis'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Speed Control', hp: 28, atk: 0, def: 4, spa: 252, spd: 4, spe: 220, description: 'Outspeeds key threats' },
      { name: 'Max Speed', hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252, description: 'Speed tie other Flutter Mane' }
    ]
  },
  {
    id: 992,
    name: 'Iron Hands',
    types: ['Fighting', 'Electric'],
    abilities: ['Quark Drive'],
    availableIn: ['vgc-reg-i', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Attacker', hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0, description: 'Assault Vest tank' },
      { name: 'AV Pivot', hp: 228, atk: 252, def: 4, spa: 0, spd: 4, spe: 20, description: 'Bulky with some speed' }
    ]
  },
  { id: 984, name: 'Great Tusk', types: ['Ground', 'Fighting'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 985, name: 'Scream Tail', types: ['Fairy', 'Psychic'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 986, name: 'Brute Bonnet', types: ['Grass', 'Dark'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 988, name: 'Slither Wing', types: ['Bug', 'Fighting'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 989, name: 'Sandy Shocks', types: ['Electric', 'Ground'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 990, name: 'Iron Treads', types: ['Ground', 'Steel'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 991, name: 'Iron Bundle', types: ['Ice', 'Water'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 993, name: 'Iron Jugulis', types: ['Dark', 'Flying'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 994, name: 'Iron Moth', types: ['Fire', 'Poison'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 995, name: 'Iron Thorns', types: ['Rock', 'Electric'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 999, name: 'Roaring Moon', types: ['Dragon', 'Dark'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 1002, name: 'Iron Valiant', types: ['Fairy', 'Fighting'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'smogon-ou'] },

  // Popular VGC Pokemon
  {
    id: 727,
    name: 'Incineroar',
    types: ['Fire', 'Dark'],
    abilities: ['Blaze', 'Intimidate'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Support', hp: 252, atk: 4, def: 52, spa: 0, spd: 196, spe: 4, description: 'Standard VGC support set' },
      { name: 'Parting Shot', hp: 252, atk: 0, def: 156, spa: 0, spd: 76, spe: 20, description: 'Defensive pivot' }
    ]
  },
  {
    id: 812,
    name: 'Rillaboom',
    types: ['Grass'],
    abilities: ['Overgrow', 'Grassy Surge'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Offensive', hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0, description: 'Assault Vest attacker' }
    ]
  },
  {
    id: 892,
    name: 'Urshifu',
    types: ['Fighting', 'Dark'],
    abilities: ['Unseen Fist'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Choice Band', hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252, description: 'Max Attack/Speed sweeper' }
    ]
  },
  { id: 59, name: 'Arcanine', types: ['Fire'], abilities: ['Intimidate', 'Flash Fire'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },

  // Paldea Pokemon
  { id: 979, name: 'Annihilape', types: ['Fighting', 'Ghost'], abilities: ['Vital Spirit', 'Inner Focus'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 972, name: 'Houndstone', types: ['Ghost'], abilities: ['Sand Rush', 'Fluffy'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 931, name: 'Squawkabilly', types: ['Normal', 'Flying'], abilities: ['Intimidate', 'Hustle'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  {
    id: 964,
    name: 'Palafin',
    types: ['Water'],
    abilities: ['Zero to Hero'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'],
    commonSpreads: [
      { name: 'Choice Band', hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252, description: 'Flip Turn into Hero Form' }
    ]
  },
  {
    id: 1000,
    name: 'Gholdengo',
    types: ['Steel', 'Ghost'],
    abilities: ['Good as Gold'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'],
    commonSpreads: [
      { name: 'Fast Special Attacker', hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252, description: 'Standard offensive set' }
    ]
  },
  {
    id: 983,
    name: 'Kingambit',
    types: ['Dark', 'Steel'],
    abilities: ['Defiant', 'Supreme Overlord'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Swords Dance', hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 0, description: 'Slow bulky sweeper' },
      { name: 'Assault Vest', hp: 220, atk: 252, def: 0, spa: 0, spd: 36, spe: 0, description: 'Tank setup' }
    ]
  },
  { id: 945, name: 'Grafaiai', types: ['Poison', 'Normal'], abilities: ['Unburden', 'Poison Touch'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 920, name: 'Lokix', types: ['Bug', 'Dark'], abilities: ['Swarm', 'Tinted Lens'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  {
    id: 998,
    name: 'Baxcalibur',
    types: ['Dragon', 'Ice'],
    abilities: ['Thermal Exchange', 'Ice Body'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Attacker', hp: 196, atk: 252, def: 0, spa: 0, spd: 60, spe: 0, description: 'Loaded Dice setup' }
    ]
  },
  { id: 923, name: 'Pawmot', types: ['Electric', 'Fighting'], abilities: ['Volt Absorb', 'Natural Cure'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 976, name: 'Veluza', types: ['Water', 'Psychic'], abilities: ['Mold Breaker', 'Sharpness'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 936, name: 'Armarouge', types: ['Fire', 'Psychic'], abilities: ['Flash Fire', 'Weak Armor'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 937, name: 'Ceruledge', types: ['Fire', 'Ghost'], abilities: ['Flash Fire', 'Weak Armor'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 954, name: 'Brambleghast', types: ['Grass', 'Ghost'], abilities: ['Wind Rider', 'Infiltrator'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 996, name: 'Frigibax', types: ['Dragon', 'Ice'], abilities: ['Thermal Exchange', 'Ice Body'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 997, name: 'Arctibax', types: ['Dragon', 'Ice'], abilities: ['Thermal Exchange', 'Ice Body'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 967, name: 'Cyclizar', types: ['Dragon', 'Normal'], abilities: ['Shed Skin', 'Regenerator'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 980, name: 'Clodsire', types: ['Poison', 'Ground'], abilities: ['Poison Point', 'Water Absorb'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 952, name: 'Scovillain', types: ['Grass', 'Fire'], abilities: ['Chlorophyll', 'Insomnia'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },
  { id: 981, name: 'Dondozo', types: ['Water'], abilities: ['Unaware', 'Oblivious'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 978, name: 'Tatsugiri', types: ['Dragon', 'Water'], abilities: ['Commander', 'Storm Drain'], availableIn: ['vgc-reg-i', 'vgc-reg-h'] },

  // Returning Pokemon
  {
    id: 6,
    name: 'Charizard',
    types: ['Fire', 'Flying'],
    abilities: ['Blaze', 'Solar Power'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Sun Sweeper', hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252, description: 'Solar Power special attacker' }
    ]
  },
  {
    id: 445,
    name: 'Garchomp',
    types: ['Dragon', 'Ground'],
    abilities: ['Sand Veil', 'Rough Skin'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Physical Sweeper', hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252, description: 'Standard offensive set' }
    ]
  },
  {
    id: 149,
    name: 'Dragonite',
    types: ['Dragon', 'Flying'],
    abilities: ['Inner Focus', 'Multiscale'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Setup', hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0, description: 'Multiscale Dragon Dance' }
    ]
  },
  {
    id: 645,
    name: 'Landorus',
    types: ['Ground', 'Flying'],
    abilities: ['Sand Force', 'Intimidate'],
    availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Offensive Pivot', hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252, description: 'Choice Scarf or pivot' }
    ]
  },
  { id: 25, name: 'Pikachu', types: ['Electric'], abilities: ['Static', 'Lightning Rod'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 26, name: 'Raichu', types: ['Electric'], abilities: ['Static', 'Lightning Rod'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 94, name: 'Gengar', types: ['Ghost', 'Poison'], abilities: ['Cursed Body'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 257, name: 'Blaziken', types: ['Fire', 'Fighting'], abilities: ['Blaze', 'Speed Boost'], availableIn: ['pokemon-champions'] },
  { id: 658, name: 'Greninja', types: ['Water', 'Dark'], abilities: ['Torrent', 'Protean'], availableIn: ['pokemon-champions', 'smogon-ou'] },
  { id: 663, name: 'Talonflame', types: ['Fire', 'Flying'], abilities: ['Flame Body', 'Gale Wings'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
  {
    id: 591,
    name: 'Amoonguss',
    types: ['Grass', 'Poison'],
    abilities: ['Effect Spore', 'Regenerator'],
    availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'],
    commonSpreads: [
      { name: 'Bulky Support', hp: 252, atk: 0, def: 168, spa: 0, spd: 88, spe: 0, description: 'Standard support spread' }
    ]
  },
  { id: 324, name: 'Torkoal', types: ['Fire'], abilities: ['White Smoke', 'Drought'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 547, name: 'Whimsicott', types: ['Grass', 'Fairy'], abilities: ['Prankster', 'Infiltrator'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 637, name: 'Volcarona', types: ['Bug', 'Fire'], abilities: ['Flame Body', 'Swarm'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 212, name: 'Scizor', types: ['Bug', 'Steel'], abilities: ['Swarm', 'Technician'], availableIn: ['pokemon-champions', 'smogon-ou'] },
  { id: 887, name: 'Dragapult', types: ['Dragon', 'Ghost'], abilities: ['Clear Body', 'Infiltrator'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 452, name: 'Drapion', types: ['Poison', 'Dark'], abilities: ['Battle Armor', 'Sniper'], availableIn: ['vgc-reg-h'] },
  { id: 184, name: 'Azumarill', types: ['Water', 'Fairy'], abilities: ['Thick Fat', 'Huge Power'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },

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

  // More competitive staples
  { id: 130, name: 'Gyarados', types: ['Water', 'Flying'], abilities: ['Intimidate', 'Moxie'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 248, name: 'Tyranitar', types: ['Rock', 'Dark'], abilities: ['Sand Stream', 'Unnerve'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 473, name: 'Mamoswine', types: ['Ice', 'Ground'], abilities: ['Oblivious', 'Thick Fat'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
  { id: 503, name: 'Samurott', types: ['Water'], abilities: ['Torrent', 'Shell Armor'], availableIn: ['pokemon-champions'] },
  { id: 635, name: 'Hydreigon', types: ['Dark', 'Dragon'], abilities: ['Levitate'], availableIn: ['vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 330, name: 'Flygon', types: ['Ground', 'Dragon'], abilities: ['Levitate'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
  { id: 642, name: 'Thundurus', types: ['Electric', 'Flying'], abilities: ['Prankster', 'Defiant'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 641, name: 'Tornadus', types: ['Flying'], abilities: ['Prankster', 'Defiant'], availableIn: ['vgc-reg-i', 'smogon-ou'] },
  { id: 785, name: 'Tapu Koko', types: ['Electric', 'Fairy'], abilities: ['Electric Surge', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 786, name: 'Tapu Lele', types: ['Psychic', 'Fairy'], abilities: ['Psychic Surge', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 787, name: 'Tapu Bulu', types: ['Grass', 'Fairy'], abilities: ['Grassy Surge', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
  { id: 788, name: 'Tapu Fini', types: ['Water', 'Fairy'], abilities: ['Misty Surge', 'Telepathy'], availableIn: ['vgc-reg-i', 'pokemon-champions'] },
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
