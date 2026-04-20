'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Upload, Shield, X, Search, Edit, Save, FolderPlus, ChevronDown } from 'lucide-react';
import { POKEMON_DATABASE, NATURES, ITEMS, type PokemonData, type EVSpread } from './pokemonData';
import Image from 'next/image';

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

interface Team {
  id: string;
  name: string;
  game: string;
  pokemon: (Pokemon | null)[];
}

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400', fire: 'bg-red-500', water: 'bg-blue-500', electric: 'bg-yellow-400',
  grass: 'bg-green-500', ice: 'bg-cyan-300', fighting: 'bg-red-700', poison: 'bg-purple-500',
  ground: 'bg-yellow-600', flying: 'bg-indigo-300', psychic: 'bg-pink-500', bug: 'bg-lime-500',
  rock: 'bg-yellow-700', ghost: 'bg-purple-700', dragon: 'bg-indigo-600', dark: 'bg-gray-700',
  steel: 'bg-gray-500', fairy: 'bg-pink-300',
};

const GAMES_AND_FORMATS = [
  { id: 'vgc-reg-i', name: 'VGC Regulation I', game: 'Scarlet/Violet', description: 'Paldea/Kitakami/Blueberry dex + 2 Restricted', format: 'Doubles' },
  { id: 'vgc-reg-h', name: 'VGC Regulation H', game: 'Scarlet/Violet', description: 'No Paradox/Legendaries', format: 'Doubles' },
  { id: 'pokemon-champions', name: 'Pokemon Champions', game: 'Pokemon Champions', description: '263 Pokemon + Mega Evolutions', format: 'Doubles' },
  { id: 'smogon-ou', name: 'Smogon OU', game: 'Gen 9', description: 'OverUsed tier singles', format: 'Singles' },
];

// Nature effects: [increased stat, decreased stat]
const NATURE_EFFECTS: Record<string, { increases?: string; decreases?: string; description: string }> = {
  'Hardy': { description: 'Neutral - No stat changes' },
  'Lonely': { increases: 'Attack', decreases: 'Defense', description: '+Atk / -Def' },
  'Brave': { increases: 'Attack', decreases: 'Speed', description: '+Atk / -Spe' },
  'Adamant': { increases: 'Attack', decreases: 'Sp. Atk', description: '+Atk / -SpA' },
  'Naughty': { increases: 'Attack', decreases: 'Sp. Def', description: '+Atk / -SpD' },
  'Bold': { increases: 'Defense', decreases: 'Attack', description: '+Def / -Atk' },
  'Docile': { description: 'Neutral - No stat changes' },
  'Relaxed': { increases: 'Defense', decreases: 'Speed', description: '+Def / -Spe' },
  'Impish': { increases: 'Defense', decreases: 'Sp. Atk', description: '+Def / -SpA' },
  'Lax': { increases: 'Defense', decreases: 'Sp. Def', description: '+Def / -SpD' },
  'Timid': { increases: 'Speed', decreases: 'Attack', description: '+Spe / -Atk' },
  'Hasty': { increases: 'Speed', decreases: 'Defense', description: '+Spe / -Def' },
  'Serious': { description: 'Neutral - No stat changes' },
  'Jolly': { increases: 'Speed', decreases: 'Sp. Atk', description: '+Spe / -SpA' },
  'Naive': { increases: 'Speed', decreases: 'Sp. Def', description: '+Spe / -SpD' },
  'Modest': { increases: 'Sp. Atk', decreases: 'Attack', description: '+SpA / -Atk' },
  'Mild': { increases: 'Sp. Atk', decreases: 'Defense', description: '+SpA / -Def' },
  'Quiet': { increases: 'Sp. Atk', decreases: 'Speed', description: '+SpA / -Spe' },
  'Bashful': { description: 'Neutral - No stat changes' },
  'Rash': { increases: 'Sp. Atk', decreases: 'Sp. Def', description: '+SpA / -SpD' },
  'Calm': { increases: 'Sp. Def', decreases: 'Attack', description: '+SpD / -Atk' },
  'Gentle': { increases: 'Sp. Def', decreases: 'Defense', description: '+SpD / -Def' },
  'Sassy': { increases: 'Sp. Def', decreases: 'Speed', description: '+SpD / -Spe' },
  'Careful': { increases: 'Sp. Def', decreases: 'Sp. Atk', description: '+SpD / -SpA' },
  'Quirky': { description: 'Neutral - No stat changes' }
};

// Item sprite mapping (using Pokemon item sprites)
const ITEM_SPRITES: Record<string, string> = {
  'Assault Vest': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/assault-vest.png',
  'Choice Band': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png',
  'Choice Scarf': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-scarf.png',
  'Choice Specs': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-specs.png',
  'Focus Sash': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/focus-sash.png',
  'Life Orb': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/life-orb.png',
  'Leftovers': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leftovers.png',
  'Sitrus Berry': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png',
  'Safety Goggles': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safety-goggles.png',
  'Rocky Helmet': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rocky-helmet.png',
  'Heavy-Duty Boots': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-duty-boots.png',
  'Weakness Policy': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/weakness-policy.png',
  'Covert Cloak': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/covert-cloak.png',
  'Mirror Herb': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mirror-herb.png',
  'Clear Amulet': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/clear-amulet.png',
  'Booster Energy': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/booster-energy.png',
  'Loaded Dice': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/loaded-dice.png',
};

export default function TeamBuilder() {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Team 1', game: 'vgc-reg-i', pokemon: Array(6).fill(null) }
  ]);
  const [currentTeamId, setCurrentTeamId] = useState('1');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamGame, setNewTeamGame] = useState('vgc-reg-i');

  const currentTeam = teams.find(t => t.id === currentTeamId)!;
  const currentGame = GAMES_AND_FORMATS.find(g => g.id === currentTeam.game);

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
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
    };

    updateTeamPokemon(selectedSlot, newPokemon);
    setShowPokemonModal(false);
    setSelectedSlot(null);
  };

  const editPokemon = (slot: number) => {
    const pokemon = currentTeam.pokemon[slot];
    if (!pokemon) return;
    setEditingPokemon({...pokemon});
    setSelectedSlot(slot);
    setShowEditModal(true);
  };

  const applyEVSpread = (spread: EVSpread) => {
    if (!editingPokemon) return;
    setEditingPokemon({
      ...editingPokemon,
      evs: {
        hp: spread.hp,
        atk: spread.atk,
        def: spread.def,
        spa: spread.spa,
        spd: spread.spd,
        spe: spread.spe
      }
    });
  };

  const saveEditedPokemon = () => {
    if (selectedSlot === null || !editingPokemon) return;
    updateTeamPokemon(selectedSlot, editingPokemon);
    setShowEditModal(false);
    setEditingPokemon(null);
    setSelectedSlot(null);
  };

  const removePokemon = (slot: number) => {
    updateTeamPokemon(slot, null);
  };

  const updateTeamPokemon = (slot: number, pokemon: Pokemon | null) => {
    setTeams(teams.map(t =>
      t.id === currentTeamId
        ? {...t, pokemon: t.pokemon.map((p, i) => i === slot ? pokemon : p)}
        : t
    ));
  };

  const updateEV = (stat: keyof Pokemon['evs'], value: number) => {
    if (!editingPokemon) return;
    const newEvs = {...editingPokemon.evs, [stat]: value};
    const total = Object.values(newEvs).reduce((sum, val) => sum + val, 0);
    if (total <= 510) {
      setEditingPokemon({...editingPokemon, evs: newEvs});
    }
  };

  const createTeam = () => {
    if (!newTeamName.trim()) return;
    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamName,
      game: newTeamGame,
      pokemon: Array(6).fill(null)
    };
    setTeams([...teams, newTeam]);
    setCurrentTeamId(newTeam.id);
    setShowTeamModal(false);
    setNewTeamName('');
  };

  const deleteTeam = (teamId: string) => {
    if (teams.length === 1) return;
    const newTeams = teams.filter(t => t.id !== teamId);
    setTeams(newTeams);
    if (currentTeamId === teamId) {
      setCurrentTeamId(newTeams[0].id);
    }
  };

  const renameTeam = (teamId: string, newName: string) => {
    setTeams(teams.map(t => t.id === teamId ? {...t, name: newName} : t));
  };

  const changeTeamGame = (teamId: string, newGame: string) => {
    setTeams(teams.map(t => t.id === teamId ? {...t, game: newGame} : t));
  };

  const filteredPokemon = POKEMON_DATABASE.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isAvailable = pokemon.availableIn.includes(currentTeam.game);

    // If there's a search query, show all matching Pokemon
    // If no search query, only show Pokemon available in the current game
    if (searchQuery.trim()) {
      return matchesSearch;
    } else {
      return isAvailable;
    }
  }).sort((a, b) => {
    const aAvailable = a.availableIn.includes(currentTeam.game);
    const bAvailable = b.availableIn.includes(currentTeam.game);
    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;
    return a.name.localeCompare(b.name);
  });

  // ESC key handler for modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPokemonModal) {
          setShowPokemonModal(false);
          setSelectedSlot(null);
          setSearchQuery('');
        } else if (showEditModal) {
          setShowEditModal(false);
          setEditingPokemon(null);
          setSelectedSlot(null);
        } else if (showTeamModal) {
          setShowTeamModal(false);
          setNewTeamName('');
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPokemonModal, showEditModal, showTeamModal]);

  const totalEvs = editingPokemon ? Object.values(editingPokemon.evs).reduce((sum, val) => sum + val, 0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-800 hover:scale-110 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                  ⚡ Pokémon Team Builder ⚡
                </h1>
                <p className="text-sm text-yellow-100 font-semibold">Gotta Build 'Em All!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTeamModal(true)}
                className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 border-2 border-green-700"
              >
                <FolderPlus className="w-4 h-4" />
                New Team
              </button>
              <button className="px-5 py-2.5 text-sm font-bold text-gray-800 bg-white rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 border-2 border-gray-300">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 border-2 border-blue-700">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Team Tabs */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border-4 border-yellow-400 p-5 mb-6">
          <div className="flex items-center gap-3 overflow-x-auto">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setCurrentTeamId(team.id)}
                className={`px-5 py-3 rounded-full font-bold whitespace-nowrap transition-all shadow-md hover:shadow-lg hover:scale-105 ${
                  currentTeamId === team.id
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-2 border-red-700'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-2 border-gray-300 hover:from-gray-200 hover:to-gray-300'
                }`}
              >
                ⭐ {team.name}
              </button>
            ))}
          </div>
        </div>

        {/* Game/Format Selection */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border-4 border-blue-400 p-7 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
            🎮 Choose Your Battle Format
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES_AND_FORMATS.map((game) => (
              <button
                key={game.id}
                onClick={() => changeTeamGame(currentTeamId, game.id)}
                className={`p-5 rounded-2xl border-4 transition-all text-left shadow-lg hover:shadow-2xl hover:scale-105 ${
                  currentTeam.game === game.id
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 scale-105'
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}
              >
                <h3 className="font-black text-gray-900 mb-2 text-lg">{game.name}</h3>
                <p className="text-xs text-purple-600 mb-2 font-bold">{game.game}</p>
                <p className="text-xs text-gray-700 mb-3">{game.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow ${
                  game.format === 'Doubles' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {game.format}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTeam.pokemon.map((pokemon, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border-4 border-red-400 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all"
            >
              {pokemon ? (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {pokemon.sprite && (
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-2 border-3 border-yellow-400 shadow-lg">
                          <Image
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            width={64}
                            height={64}
                            className="pixelated"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-black text-gray-900">{pokemon.name}</h3>
                        <div className="flex gap-1.5 mt-2">
                          {pokemon.types.map((type) => (
                            <span
                              key={type}
                              className={`px-3 py-1.5 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded-full text-xs font-black uppercase shadow-md`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editPokemon(index)}
                        className="w-9 h-9 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => removePokemon(index)}
                        className="w-9 h-9 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="bg-purple-50 rounded-xl p-3 border-2 border-purple-200">
                      <p className="font-bold text-purple-900">⚡ {pokemon.ability}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-200">
                      <p className="font-bold text-blue-900">🎒 {pokemon.item}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 border-2 border-green-200">
                      <p className="font-bold text-green-900">🌟 {pokemon.nature}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-2.5 border-2 border-orange-200 text-xs font-semibold text-orange-900">
                      EVs: {pokemon.evs.hp} HP / {pokemon.evs.atk} Atk / {pokemon.evs.def} Def / {pokemon.evs.spa} SpA / {pokemon.evs.spd} SpD / {pokemon.evs.spe} Spe
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => addPokemon(index)}
                  className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-4 p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all group"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-500 group-hover:from-red-500 group-hover:to-red-600 flex items-center justify-center transition-all shadow-lg group-hover:shadow-xl group-hover:scale-110 border-4 border-white">
                    <Plus className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-gray-900 mb-1 text-lg">Add Pokémon</p>
                    <p className="text-sm text-gray-600 font-bold">Slot {index + 1} / 6</p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pokemon Selection Modal */}
      {showPokemonModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-8 border-yellow-400">
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-7 text-white sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-black mb-2 drop-shadow-lg">✨ Choose Your Pokémon! ✨</h2>
                  <p className="text-yellow-100 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-full">{currentGame?.name} - {currentGame?.game}</p>
                </div>
                <button
                  onClick={() => {
                    setShowPokemonModal(false);
                    setSelectedSlot(null);
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your favorite Pokémon..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold shadow-lg border-2 border-white"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)] bg-gradient-to-br from-blue-50 to-purple-50">
              {filteredPokemon.length === 0 && !searchQuery.trim() && (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-700 mb-2">🔍 No Pokémon available in this format!</p>
                  <p className="text-sm text-gray-600 font-semibold">Try searching for a specific Pokémon to see all options.</p>
                </div>
              )}
              {filteredPokemon.length === 0 && searchQuery.trim() && (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-700">😢 No Pokémon found matching "{searchQuery}"</p>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => {
                  const isAvailable = pokemon.availableIn.includes(currentTeam.game);
                  return (
                    <button
                      key={pokemon.id}
                      onClick={() => isAvailable && selectPokemon(pokemon)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-2xl border-4 transition-all shadow-lg ${
                        isAvailable
                          ? 'border-blue-300 hover:border-yellow-400 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 cursor-pointer bg-white hover:scale-110 hover:shadow-2xl'
                          : 'border-gray-200 bg-gray-100 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${isAvailable ? 'from-blue-50 to-purple-50' : 'from-gray-50 to-gray-100'} rounded-xl p-2 mb-2`}>
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                          alt={pokemon.name}
                          width={96}
                          height={96}
                          className="mx-auto pixelated"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-black text-gray-900 mb-2">{pokemon.name}</h3>
                        {isAvailable ? (
                          <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-xs font-black shadow-md">
                            ✓ Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded-full text-xs font-black">
                            ✗ Unavailable
                          </span>
                        )}
                        <div className="flex gap-1 justify-center mt-2 flex-wrap">
                          {pokemon.types.map((type) => (
                            <span
                              key={type}
                              className={`px-2 py-1 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded-full text-xs font-black uppercase shadow`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {filteredPokemon.length > 0 && !searchQuery.trim() && (
                <div className="text-center mt-6 bg-blue-100 rounded-2xl p-4 border-2 border-blue-300">
                  <p className="text-sm font-bold text-blue-900">
                    💡 Showing only Pokémon available in {currentGame?.name}. Use search to see all Pokémon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Pokemon Modal */}
      {showEditModal && editingPokemon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-8 border-purple-400">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-7 text-white sticky top-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {editingPokemon.sprite && (
                    <div className="bg-white rounded-2xl p-3 border-4 border-white shadow-xl">
                      <Image
                        src={editingPokemon.sprite}
                        alt={editingPokemon.name}
                        width={80}
                        height={80}
                        className="pixelated"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-black mb-3 drop-shadow-lg">⚡ Customize {editingPokemon.name}</h2>
                    <div className="flex gap-2">
                      {editingPokemon.types.map((type) => (
                        <span key={type} className={`px-4 py-1.5 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded-full text-xs font-black uppercase shadow-lg border-2 border-white`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowEditModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-7 space-y-6 bg-gradient-to-br from-purple-50 to-pink-50">
              {/* Nature & Item */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-lg border-3 border-green-300">
                  <label className="block text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                    🌟 Nature
                  </label>
                  <select
                    value={editingPokemon.nature}
                    onChange={(e) => setEditingPokemon({...editingPokemon, nature: e.target.value})}
                    className="w-full px-4 py-3 border-3 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 font-bold shadow-md"
                  >
                    {NATURES.map(nature => {
                      const effect = NATURE_EFFECTS[nature];
                      return (
                        <option key={nature} value={nature}>
                          {nature} {effect.description ? `- ${effect.description}` : ''}
                        </option>
                      );
                    })}
                  </select>
                  {editingPokemon.nature && NATURE_EFFECTS[editingPokemon.nature] && (
                    <div className="mt-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 text-xs font-bold border-2 border-green-200">
                      {NATURE_EFFECTS[editingPokemon.nature].increases && (
                        <span className="text-green-700">
                          ⬆️ +10% {NATURE_EFFECTS[editingPokemon.nature].increases}
                        </span>
                      )}
                      {NATURE_EFFECTS[editingPokemon.nature].increases && NATURE_EFFECTS[editingPokemon.nature].decreases && <span className="text-gray-500"> • </span>}
                      {NATURE_EFFECTS[editingPokemon.nature].decreases && (
                        <span className="text-red-700">
                          ⬇️ -10% {NATURE_EFFECTS[editingPokemon.nature].decreases}
                        </span>
                      )}
                      {!NATURE_EFFECTS[editingPokemon.nature].increases && !NATURE_EFFECTS[editingPokemon.nature].decreases && (
                        <span className="text-gray-600">➖ No stat changes</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-lg border-3 border-blue-300">
                  <label className="block text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                    🎒 Held Item
                  </label>
                  <select
                    value={editingPokemon.item}
                    onChange={(e) => setEditingPokemon({...editingPokemon, item: e.target.value})}
                    className="w-full px-4 py-3 border-3 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 font-bold shadow-md"
                  >
                    {ITEMS.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {editingPokemon.item && editingPokemon.item !== 'None' && ITEM_SPRITES[editingPokemon.item] && (
                    <div className="mt-3 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border-2 border-blue-200">
                      <Image
                        src={ITEM_SPRITES[editingPokemon.item]}
                        alt={editingPokemon.item}
                        width={32}
                        height={32}
                        className="pixelated"
                      />
                      <span className="text-xs font-bold text-blue-900">{editingPokemon.item}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* EVs */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-3 border-orange-300">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    📊 Effort Values (EVs)
                  </h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-black shadow-md ${totalEvs > 510 ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white'}`}>
                    {totalEvs} / 510
                  </span>
                </div>

                {/* EV Presets */}
                {(() => {
                  const pokemonData = POKEMON_DATABASE.find(p => p.id === parseInt(editingPokemon.id));
                  if (pokemonData?.commonSpreads && pokemonData.commonSpreads.length > 0) {
                    return (
                      <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-3 border-blue-300 rounded-2xl shadow-md">
                        <h4 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                          ⭐ Popular EV Spreads
                        </h4>
                        <div className="space-y-3">
                          {pokemonData.commonSpreads.map((spread, index) => (
                            <button
                              key={index}
                              onClick={() => applyEVSpread(spread)}
                              className="w-full text-left p-4 bg-white border-3 border-blue-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-purple-400 transition-all shadow-md hover:shadow-lg hover:scale-102"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-black text-gray-900">{spread.name}</span>
                                <span className="text-xs font-bold bg-blue-500 text-white px-3 py-1 rounded-full">{spread.hp + spread.atk + spread.def + spread.spa + spread.spd + spread.spe} EVs</span>
                              </div>
                              <p className="text-xs text-gray-700 mb-3 font-semibold">{spread.description}</p>
                              <div className="flex gap-2 text-xs font-bold flex-wrap">
                                {spread.hp > 0 && <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">{spread.hp} HP</span>}
                                {spread.atk > 0 && <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{spread.atk} Atk</span>}
                                {spread.def > 0 && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{spread.def} Def</span>}
                                {spread.spa > 0 && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{spread.spa} SpA</span>}
                                {spread.spd > 0 && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{spread.spd} SpD</span>}
                                {spread.spe > 0 && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{spread.spe} Spe</span>}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="space-y-5">
                  {(['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const).map((stat) => (
                    <div key={stat} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-black text-gray-900 uppercase">{stat}</label>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-sm font-black shadow-md">{editingPokemon.evs[stat]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="252"
                        step="4"
                        value={editingPokemon.evs[stat]}
                        onChange={(e) => updateEV(stat, parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer accent-purple-600 shadow-inner"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveEditedPokemon}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-black text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 border-4 border-green-700"
              >
                <Save className="w-6 h-6" />
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-8 border-green-400">
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">✨ Create New Team ✨</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                  🏆 Team Name
                </label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g., Rain Team, Trick Room, etc."
                  className="w-full px-5 py-3 border-3 border-blue-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 font-bold shadow-lg"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                  🎮 Game/Format
                </label>
                <select
                  value={newTeamGame}
                  onChange={(e) => setNewTeamGame(e.target.value)}
                  className="w-full px-5 py-3 border-3 border-purple-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 font-bold shadow-lg"
                >
                  {GAMES_AND_FORMATS.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={createTeam}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-black hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 border-3 border-green-700"
                >
                  ✅ Create
                </button>
                <button
                  onClick={() => {
                    setShowTeamModal(false);
                    setNewTeamName('');
                  }}
                  className="flex-1 px-6 py-3 border-3 border-gray-300 text-gray-700 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .pixelated {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
