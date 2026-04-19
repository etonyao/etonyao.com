'use client';

import { useState } from 'react';
import { Plus, Trash2, Download, Upload, Shield, X, Search, Check } from 'lucide-react';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  ability: string;
  item: string;
  moves: string[];
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  nature: string;
  sprite?: string;
}

interface PokemonData {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  availableIn: string[];
}

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const GAMES_AND_FORMATS = [
  {
    id: 'vgc-reg-i',
    name: 'VGC Regulation I',
    game: 'Scarlet/Violet',
    description: 'VGC 2024 Regulation I - Paldea Pokédex only',
    format: 'Doubles'
  },
  {
    id: 'vgc-reg-h',
    name: 'VGC Regulation H',
    game: 'Scarlet/Violet',
    description: 'VGC 2025 Regulation H - Full National Dex',
    format: 'Doubles'
  },
  {
    id: 'pokemon-champions',
    name: 'Pokemon Champions',
    game: 'Pokemon Champions',
    description: 'Pokemon Champions competitive format',
    format: 'Varied'
  },
  {
    id: 'smogon-ou',
    name: 'Smogon OU',
    game: 'Scarlet/Violet',
    description: 'Gen 9 OverUsed tier singles',
    format: 'Singles'
  },
];

// Mock Pokemon database - in a real app, this would come from an API
const POKEMON_DATABASE: PokemonData[] = [
  { id: 1, name: 'Charizard', types: ['Fire', 'Flying'], abilities: ['Blaze', 'Solar Power'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 2, name: 'Incineroar', types: ['Fire', 'Dark'], abilities: ['Blaze', 'Intimidate'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 3, name: 'Rillaboom', types: ['Grass'], abilities: ['Overgrow', 'Grassy Surge'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 4, name: 'Urshifu', types: ['Fighting', 'Dark'], abilities: ['Unseen Fist'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 5, name: 'Flutter Mane', types: ['Ghost', 'Fairy'], abilities: ['Protosynthesis'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 6, name: 'Amoonguss', types: ['Grass', 'Poison'], abilities: ['Effect Spore', 'Regenerator'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 7, name: 'Landorus', types: ['Ground', 'Flying'], abilities: ['Sand Force', 'Intimidate'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 8, name: 'Chi-Yu', types: ['Dark', 'Fire'], abilities: ['Beads of Ruin'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 9, name: 'Torkoal', types: ['Fire'], abilities: ['White Smoke', 'Drought'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions'] },
  { id: 10, name: 'Palafin', types: ['Water'], abilities: ['Zero to Hero'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 11, name: 'Iron Hands', types: ['Fighting', 'Electric'], abilities: ['Quark Drive'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 12, name: 'Gholdengo', types: ['Steel', 'Ghost'], abilities: ['Good as Gold'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 13, name: 'Arcanine', types: ['Fire'], abilities: ['Intimidate', 'Flash Fire'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 14, name: 'Kingambit', types: ['Dark', 'Steel'], abilities: ['Defiant', 'Supreme Overlord'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 15, name: 'Garchomp', types: ['Dragon', 'Ground'], abilities: ['Sand Veil', 'Rough Skin'], availableIn: ['vgc-reg-h', 'smogon-ou'] },
  { id: 16, name: 'Dragonite', types: ['Dragon', 'Flying'], abilities: ['Inner Focus', 'Multiscale'], availableIn: ['vgc-reg-h', 'smogon-ou', 'pokemon-champions'] },
  { id: 17, name: 'Meowscarada', types: ['Grass', 'Dark'], abilities: ['Overgrow', 'Protean'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 18, name: 'Skeledirge', types: ['Fire', 'Ghost'], abilities: ['Blaze', 'Unaware'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'smogon-ou'] },
  { id: 19, name: 'Pikachu', types: ['Electric'], abilities: ['Static', 'Lightning Rod'], availableIn: ['vgc-reg-i', 'vgc-reg-h', 'pokemon-champions', 'smogon-ou'] },
  { id: 20, name: 'Talonflame', types: ['Fire', 'Flying'], abilities: ['Flame Body', 'Gale Wings'], availableIn: ['vgc-reg-h', 'pokemon-champions'] },
];

export default function TeamBuilder() {
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [selectedGame, setSelectedGame] = useState('vgc-reg-i');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentGame = GAMES_AND_FORMATS.find(g => g.id === selectedGame);

  const addPokemon = (slot: number) => {
    setSelectedSlot(slot);
    setShowPokemonModal(true);
    setSearchQuery('');
  };

  const selectPokemon = (pokemonData: PokemonData) => {
    if (selectedSlot === null) return;

    const newPokemon: Pokemon = {
      id: pokemonData.id.toString(),
      name: pokemonData.name,
      types: pokemonData.types,
      ability: pokemonData.abilities[0],
      item: 'None',
      moves: [],
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      nature: 'Serious',
    };

    const newTeam = [...team];
    newTeam[selectedSlot] = newPokemon;
    setTeam(newTeam);
    setShowPokemonModal(false);
    setSelectedSlot(null);
  };

  const removePokemon = (slot: number) => {
    const newTeam = [...team];
    newTeam[slot] = null;
    setTeam(newTeam);
  };

  const exportTeam = () => {
    console.log('Exporting team...');
  };

  const importTeam = () => {
    console.log('Importing team...');
  };

  // Filter Pokemon based on search and availability
  const filteredPokemon = POKEMON_DATABASE.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    // Sort: available first, then alphabetically
    const aAvailable = a.availableIn.includes(selectedGame);
    const bAvailable = b.availableIn.includes(selectedGame);
    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pokemon Team Builder</h1>
                <p className="text-xs text-gray-500">Competitive Team Planner</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={importTeam}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={exportTeam}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Game/Format Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Game & Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES_AND_FORMATS.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedGame === game.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{game.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{game.game}</p>
                <p className="text-xs text-gray-600">{game.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {game.format}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {team.map((pokemon, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {pokemon ? (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{pokemon.name}</h3>
                      <div className="flex gap-2 mt-2">
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className={`px-3 py-1 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded-full text-xs font-medium uppercase`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removePokemon(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Ability:</strong> {pokemon.ability}</p>
                    <p><strong>Item:</strong> {pokemon.item}</p>
                    <p><strong>Nature:</strong> {pokemon.nature}</p>
                    {pokemon.moves.length > 0 && (
                      <div>
                        <strong>Moves:</strong>
                        <ul className="mt-1 space-y-1">
                          {pokemon.moves.map((move, i) => (
                            <li key={i} className="text-gray-600">• {move}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => addPokemon(index)}
                  className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-4 p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 mb-1">Add Pokemon</p>
                    <p className="text-sm text-gray-500">Slot {index + 1}</p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Type Coverage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Type Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(TYPE_COLORS).map((type) => (
              <div
                key={type}
                className={`${TYPE_COLORS[type]} rounded-lg p-3 text-white text-center`}
              >
                <p className="font-medium uppercase text-sm">{type}</p>
                <p className="text-2xl font-bold mt-1">0x</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Add Pokemon to see offensive type coverage
          </p>
        </div>
      </div>

      {/* Pokemon Selection Modal */}
      {showPokemonModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Select Pokemon</h2>
                  <p className="text-blue-100 text-sm">
                    {currentGame?.name} - {currentGame?.game}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPokemonModal(false);
                    setSelectedSlot(null);
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Pokemon..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  autoFocus
                />
              </div>
            </div>

            {/* Pokemon List */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-220px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPokemon.map((pokemon) => {
                  const isAvailable = pokemon.availableIn.includes(selectedGame);
                  return (
                    <button
                      key={pokemon.id}
                      onClick={() => isAvailable && selectPokemon(pokemon)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isAvailable
                          ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{pokemon.name}</h3>
                        {isAvailable ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Not Available
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mb-2">
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className={`px-2 py-1 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded text-xs font-medium uppercase`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        {pokemon.abilities.join(' / ')}
                      </p>
                    </button>
                  );
                })}
              </div>

              {filteredPokemon.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No Pokemon found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
