'use client';

import { useState } from 'react';
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
    return matchesSearch;
  }).sort((a, b) => {
    const aAvailable = a.availableIn.includes(currentTeam.game);
    const bAvailable = b.availableIn.includes(currentTeam.game);
    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;
    return a.name.localeCompare(b.name);
  });

  const totalEvs = editingPokemon ? Object.values(editingPokemon.evs).reduce((sum, val) => sum + val, 0) : 0;

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
                onClick={() => setShowTeamModal(true)}
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                New Team
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setCurrentTeamId(team.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  currentTeamId === team.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {team.name} ({GAMES_AND_FORMATS.find(g => g.id === team.game)?.name})
              </button>
            ))}
          </div>
        </div>

        {/* Game/Format Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Game & Format for {currentTeam.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAMES_AND_FORMATS.map((game) => (
              <button
                key={game.id}
                onClick={() => changeTeamGame(currentTeamId, game.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  currentTeam.game === game.id
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
          {currentTeam.pokemon.map((pokemon, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {pokemon ? (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {pokemon.sprite && (
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          width={64}
                          height={64}
                          className="pixelated"
                        />
                      )}
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
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editPokemon(index)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removePokemon(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Ability:</strong> {pokemon.ability}</p>
                    <p><strong>Item:</strong> {pokemon.item}</p>
                    <p><strong>Nature:</strong> {pokemon.nature}</p>
                    <div className="text-xs text-gray-500">
                      EVs: {pokemon.evs.hp} HP / {pokemon.evs.atk} Atk / {pokemon.evs.def} Def / {pokemon.evs.spa} SpA / {pokemon.evs.spd} SpD / {pokemon.evs.spe} Spe
                    </div>
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
      </div>

      {/* Pokemon Selection Modal */}
      {showPokemonModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Select Pokemon</h2>
                  <p className="text-blue-100 text-sm">{currentGame?.name} - {currentGame?.game}</p>
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

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => {
                  const isAvailable = pokemon.availableIn.includes(currentTeam.game);
                  return (
                    <button
                      key={pokemon.id}
                      onClick={() => isAvailable && selectPokemon(pokemon)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isAvailable
                          ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.name}
                        width={96}
                        height={96}
                        className="mx-auto pixelated"
                      />
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{pokemon.name}</h3>
                        {isAvailable ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Not Available
                          </span>
                        )}
                        <div className="flex gap-1 justify-center mt-2">
                          {pokemon.types.map((type) => (
                            <span
                              key={type}
                              className={`px-2 py-0.5 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded text-xs uppercase`}
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
            </div>
          </div>
        </div>
      )}

      {/* Edit Pokemon Modal */}
      {showEditModal && editingPokemon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {editingPokemon.sprite && (
                    <Image
                      src={editingPokemon.sprite}
                      alt={editingPokemon.name}
                      width={80}
                      height={80}
                      className="pixelated"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Edit {editingPokemon.name}</h2>
                    <div className="flex gap-2">
                      {editingPokemon.types.map((type) => (
                        <span key={type} className={`px-3 py-1 ${TYPE_COLORS[type.toLowerCase()]} text-white rounded-full text-xs font-medium uppercase`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowEditModal(false)} className="text-white/80 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Nature & Item */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nature</label>
                  <select
                    value={editingPokemon.nature}
                    onChange={(e) => setEditingPokemon({...editingPokemon, nature: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {NATURES.map(nature => (
                      <option key={nature} value={nature}>{nature}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
                  <select
                    value={editingPokemon.item}
                    onChange={(e) => setEditingPokemon({...editingPokemon, item: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {ITEMS.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* EVs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Effort Values (EVs)</h3>
                  <span className={`text-sm font-medium ${totalEvs > 510 ? 'text-red-600' : 'text-gray-600'}`}>
                    Total: {totalEvs} / 510
                  </span>
                </div>

                {/* EV Presets */}
                {(() => {
                  const pokemonData = POKEMON_DATABASE.find(p => p.id === parseInt(editingPokemon.id));
                  if (pokemonData?.commonSpreads && pokemonData.commonSpreads.length > 0) {
                    return (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Common EV Spreads</h4>
                        <div className="space-y-2">
                          {pokemonData.commonSpreads.map((spread, index) => (
                            <button
                              key={index}
                              onClick={() => applyEVSpread(spread)}
                              className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">{spread.name}</span>
                                <span className="text-xs text-gray-500">{spread.hp + spread.atk + spread.def + spread.spa + spread.spd + spread.spe} EVs</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{spread.description}</p>
                              <div className="flex gap-2 text-xs text-gray-500">
                                {spread.hp > 0 && <span>{spread.hp} HP</span>}
                                {spread.atk > 0 && <span>{spread.atk} Atk</span>}
                                {spread.def > 0 && <span>{spread.def} Def</span>}
                                {spread.spa > 0 && <span>{spread.spa} SpA</span>}
                                {spread.spd > 0 && <span>{spread.spd} SpD</span>}
                                {spread.spe > 0 && <span>{spread.spe} Spe</span>}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="space-y-4">
                  {(['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const).map((stat) => (
                    <div key={stat} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 uppercase">{stat}</label>
                        <span className="text-sm font-bold text-gray-900">{editingPokemon.evs[stat]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="252"
                        step="4"
                        value={editingPokemon.evs[stat]}
                        onChange={(e) => updateEV(stat, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveEditedPokemon}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Team</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g., Rain Team, Trick Room, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Game/Format</label>
                <select
                  value={newTeamGame}
                  onChange={(e) => setNewTeamGame(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {GAMES_AND_FORMATS.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={createTeam}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Team
                </button>
                <button
                  onClick={() => {
                    setShowTeamModal(false);
                    setNewTeamName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
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
      `}</style>
    </div>
  );
}
