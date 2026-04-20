'use client';

import { useState } from 'react';
import { Plus, Trash2, Download, Upload, Shield, Swords, Zap, Droplet, Leaf, Flame } from 'lucide-react';

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  ability: string;
  item: string;
  moves: string[];
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  nature: string;
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

const GAME_FORMATS = [
  { id: 'vgc', name: 'VGC (Doubles)', description: 'Official Video Game Championships format' },
  { id: 'singles', name: 'Singles (6v6)', description: 'Traditional 6v6 single battles' },
  { id: 'doubles', name: 'Doubles (Smogon)', description: 'Smogon doubles format' },
];

export default function TeamBuilder() {
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [selectedFormat, setSelectedFormat] = useState('vgc');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const addPokemon = (slot: number) => {
    setSelectedSlot(slot);
    // In a real app, this would open a Pokemon selection modal
  };

  const removePokemon = (slot: number) => {
    const newTeam = [...team];
    newTeam[slot] = null;
    setTeam(newTeam);
  };

  const exportTeam = () => {
    // Export team in Showdown format
    console.log('Exporting team...');
  };

  const importTeam = () => {
    // Import team from Showdown format
    console.log('Importing team...');
  };

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
        {/* Format Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Battle Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GAME_FORMATS.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedFormat === format.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
                <p className="text-sm text-gray-600">{format.description}</p>
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
                    <div>
                      <strong>Moves:</strong>
                      <ul className="mt-1 space-y-1">
                        {pokemon.moves.map((move, i) => (
                          <li key={i} className="text-gray-600">• {move}</li>
                        ))}
                      </ul>
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
    </div>
  );
}
