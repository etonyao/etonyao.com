'use client';

import { useState, useEffect } from 'react';
import { POKEMON_DATABASE, NATURES, ITEMS, type PokemonData, type EVSpread } from './pokemonData';
import Link from 'next/link';

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
  normal: '#9098a1', fire: '#ff7144', water: '#4d90d5', electric: '#f3c63d',
  grass: '#5cba5f', ice: '#74cfc4', fighting: '#e0533d', poison: '#a85fc6',
  ground: '#dba94e', flying: '#8aa8e8', psychic: '#f5698f', bug: '#a3b333',
  rock: '#c6b766', ghost: '#6a5ba0', dragon: '#5a6fe0', dark: '#5b5468',
  steel: '#7f8ca3', fairy: '#ec8fc9',
};

const GAMES_AND_FORMATS = [
  { id: 'vgc-reg-i', name: 'VGC Reg I', game: 'Scarlet/Violet', description: 'Paldea/Kitakami/Blueberry + 2 Restricted', format: 'Doubles' },
  { id: 'vgc-reg-h', name: 'VGC Reg H', game: 'Scarlet/Violet', description: 'No Paradox/Legendaries', format: 'Doubles' },
  { id: 'pokemon-champions', name: 'Pokémon Champions', game: 'Champions', description: '263 Pokémon + Mega Evolutions', format: 'Doubles' },
  { id: 'smogon-ou', name: 'Smogon OU', game: 'Gen 9', description: 'OverUsed tier singles', format: 'Singles' },
];

const NATURE_EFFECTS: Record<string, { increases?: string; decreases?: string; note: string }> = {
  'Hardy': { note: 'Neutral' }, 'Lonely': { increases: 'atk', decreases: 'def', note: '+Atk / −Def' },
  'Brave': { increases: 'atk', decreases: 'spe', note: '+Atk / −Spe' }, 'Adamant': { increases: 'atk', decreases: 'spa', note: '+Atk / −SpA' },
  'Naughty': { increases: 'atk', decreases: 'spd', note: '+Atk / −SpD' }, 'Bold': { increases: 'def', decreases: 'atk', note: '+Def / −Atk' },
  'Docile': { note: 'Neutral' }, 'Relaxed': { increases: 'def', decreases: 'spe', note: '+Def / −Spe' },
  'Impish': { increases: 'def', decreases: 'spa', note: '+Def / −SpA' }, 'Lax': { increases: 'def', decreases: 'spd', note: '+Def / −SpD' },
  'Timid': { increases: 'spe', decreases: 'atk', note: '+Spe / −Atk' }, 'Hasty': { increases: 'spe', decreases: 'def', note: '+Spe / −Def' },
  'Serious': { note: 'Neutral' }, 'Jolly': { increases: 'spe', decreases: 'spa', note: '+Spe / −SpA' },
  'Naive': { increases: 'spe', decreases: 'spd', note: '+Spe / −SpD' }, 'Modest': { increases: 'spa', decreases: 'atk', note: '+SpA / −Atk' },
  'Mild': { increases: 'spa', decreases: 'def', note: '+SpA / −Def' }, 'Quiet': { increases: 'spa', decreases: 'spe', note: '+SpA / −Spe' },
  'Bashful': { note: 'Neutral' }, 'Rash': { increases: 'spa', decreases: 'spd', note: '+SpA / −SpD' },
  'Calm': { increases: 'spd', decreases: 'atk', note: '+SpD / −Atk' }, 'Gentle': { increases: 'spd', decreases: 'def', note: '+SpD / −Def' },
  'Sassy': { increases: 'spd', decreases: 'spe', note: '+SpD / −Spe' }, 'Careful': { increases: 'spd', decreases: 'spa', note: '+SpD / −SpA' },
  'Quirky': { note: 'Neutral' },
};

const STAT_LABELS: Record<string, string> = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
const STAT_KEYS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const;

const ACCENT = '#1E9E5A';
const BG = '#EFF3EC';
const PANEL = 'rgba(255,255,255,0.72)';
const BORDER = 'rgba(22,36,27,0.1)';
const INK = '#16241B';
const INK2 = '#5E6E63';
const INK3 = '#8A988D';
const MONO = "'JetBrains Mono',monospace";

function TypeBadge({ type, mini }: { type: string; mini?: boolean }) {
  const col = TYPE_COLORS[type.toLowerCase()] ?? '#9098a1';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: mini ? '2px 7px' : '3px 10px',
      borderRadius: 6, fontSize: mini ? 10 : 11, fontWeight: 700,
      color: '#fff', background: col, letterSpacing: '0.02em', textTransform: 'capitalize',
    }}>{type}</span>
  );
}

function SpriteBox({ pokemon, size = 52 }: { pokemon: Pokemon; size?: number }) {
  const c1 = TYPE_COLORS[pokemon.types[0]?.toLowerCase()] ?? ACCENT;
  const c2 = TYPE_COLORS[pokemon.types[1]?.toLowerCase()] ?? c1;
  return (
    <div style={{
      position: 'relative', width: size, height: size, borderRadius: size * 0.22,
      flexShrink: 0, overflow: 'hidden',
      background: `linear-gradient(140deg,${c1},${c2})`,
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.10) 0 5px,transparent 5px 11px)' }} />
      {pokemon.sprite && (
        <img src={pokemon.sprite} alt={pokemon.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18) translateY(-3%)', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.25))' }} />
      )}
    </div>
  );
}

export default function TeamBuilder() {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'My Team', game: 'vgc-reg-i', pokemon: Array(6).fill(null) }
  ]);
  const [currentTeamId, setCurrentTeamId] = useState('1');
  const [activeSlot, setActiveSlot] = useState(0);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showTeamsMenu, setShowTeamsMenu] = useState(false);
  const [addingToSlot, setAddingToSlot] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamGame, setNewTeamGame] = useState('vgc-reg-i');
  const [view, setView] = useState<'builder' | 'overview'>('builder');
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState('');

  const currentTeam = teams.find(t => t.id === currentTeamId)!;
  const currentGame = GAMES_AND_FORMATS.find(g => g.id === currentTeam.game);
  const filledPokemon = currentTeam.pokemon.filter(Boolean) as Pokemon[];
  const activePokemon = currentTeam.pokemon[activeSlot] ?? null;

  const updateTeamPokemon = (slot: number, pokemon: Pokemon | null) => {
    setTeams(teams.map(t => t.id === currentTeamId ? { ...t, pokemon: t.pokemon.map((p, i) => i === slot ? pokemon : p) } : t));
  };

  const selectPokemon = (pokemonData: PokemonData) => {
    const slot = addingToSlot ?? activeSlot;
    updateTeamPokemon(slot, {
      id: pokemonData.id.toString(), name: pokemonData.name, types: pokemonData.types,
      ability: pokemonData.abilities[0], item: 'None', moves: ['', '', '', ''],
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: 'Jolly',
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
    });
    setActiveSlot(slot);
    setShowPokemonModal(false);
    setAddingToSlot(null);
  };

  const openEdit = (slot: number) => {
    const p = currentTeam.pokemon[slot];
    if (!p) return;
    setEditingPokemon({ ...p, moves: [...(p.moves.length === 4 ? p.moves : ['', '', '', ''])] });
    setShowEditModal(true);
  };

  const saveEditedPokemon = () => {
    if (!editingPokemon) return;
    updateTeamPokemon(activeSlot, editingPokemon);
    setShowEditModal(false);
    setEditingPokemon(null);
  };

  const updateEV = (stat: keyof Pokemon['evs'], value: number) => {
    if (!editingPokemon) return;
    const newEvs = { ...editingPokemon.evs, [stat]: value };
    if (Object.values(newEvs).reduce((a, b) => a + b, 0) <= 510)
      setEditingPokemon({ ...editingPokemon, evs: newEvs });
  };

  const applyEVSpread = (spread: EVSpread) => {
    if (!editingPokemon) return;
    setEditingPokemon({ ...editingPokemon, evs: { hp: spread.hp, atk: spread.atk, def: spread.def, spa: spread.spa, spd: spread.spd, spe: spread.spe } });
  };

  const createTeam = () => {
    if (!newTeamName.trim()) return;
    const t: Team = { id: Date.now().toString(), name: newTeamName, game: newTeamGame, pokemon: Array(6).fill(null) };
    setTeams([...teams, t]);
    setCurrentTeamId(t.id);
    setActiveSlot(0);
    setShowTeamModal(false);
    setNewTeamName('');
  };

  const deleteTeam = (id: string) => {
    if (teams.length === 1) return;
    const next = teams.filter(t => t.id !== id);
    setTeams(next);
    if (currentTeamId === id) setCurrentTeamId(next[0].id);
  };

  const filteredPokemon = POKEMON_DATABASE.filter(p => {
    const q = searchQuery.trim().toLowerCase();
    return q ? p.name.toLowerCase().includes(q) : p.availableIn.includes(currentTeam.game);
  }).sort((a, b) => {
    const av = a.availableIn.includes(currentTeam.game), bv = b.availableIn.includes(currentTeam.game);
    return av === bv ? a.name.localeCompare(b.name) : av ? -1 : 1;
  });

  const totalEvs = editingPokemon ? Object.values(editingPokemon.evs).reduce((a, b) => a + b, 0) : 0;

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPokemonModal(false); setShowEditModal(false); setShowTeamModal(false); setShowTeamsMenu(false);
        setAddingToSlot(null); setEditingPokemon(null); setSearchQuery('');
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const accent = filledPokemon.length > 0
    ? TYPE_COLORS[filledPokemon[0].types[0]?.toLowerCase()] ?? ACCENT
    : ACCENT;

  // Active pokemon accent (from selected slot)
  const activeAccent = activePokemon
    ? TYPE_COLORS[activePokemon.types[0]?.toLowerCase()] ?? accent
    : accent;

  const natEffect = (nature: string, stat: string) => {
    const n = NATURE_EFFECTS[nature];
    if (!n) return '';
    if (n.increases === stat) return '+';
    if (n.decreases === stat) return '−';
    return '';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: ${BG}; font-family: 'Geist','Geist Fallback',system-ui,sans-serif; -webkit-font-smoothing: antialiased; }
        input, button, select, textarea { font-family: inherit; }
        input[type=range] { accent-color: ${ACCENT}; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: rgba(22,36,27,0.18); border-radius: 6px; }
        @keyframes pop { from { opacity:0; transform:translateY(-6px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .move-btn { transition: border-color .12s, background .12s; }
        .move-btn:hover { border-color: rgba(22,36,27,0.22) !important; }
        .slot-row { transition: background .12s, border-color .12s; }
        .slot-row:hover { background: rgba(22,36,27,0.04) !important; }
      `}</style>

      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column' }}>

        {/* Nav */}
        <header style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', borderBottom: `1px solid ${BORDER}`, background: 'rgba(239,243,236,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: INK2, textDecoration: 'none', fontWeight: 500 }}>
            <span>←</span> Home
          </Link>
          <div style={{ width: 1, height: 22, background: BORDER }} />

          {/* Team name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 6px 3px 8px', borderRadius: 10, border: `1px solid transparent` }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
            onMouseLeave={e => { if (!editingName) (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
            {editingName ? (
              <input
                value={nameVal}
                autoFocus
                onChange={e => setNameVal(e.target.value)}
                onBlur={() => { setTeams(teams.map(t => t.id === currentTeamId ? { ...t, name: nameVal } : t)); setEditingName(false); }}
                onKeyDown={e => { if (e.key === 'Enter') { setTeams(teams.map(t => t.id === currentTeamId ? { ...t, name: nameVal } : t)); setEditingName(false); } }}
                style={{ fontFamily: "'Geist',sans-serif", fontWeight: 600, fontSize: 15, color: INK, background: 'transparent', border: 'none', outline: 'none', width: 180, padding: '4px 2px' }}
              />
            ) : (
              <button onClick={() => { setNameVal(currentTeam.name); setEditingName(true); }} style={{ all: 'unset', fontWeight: 600, fontSize: 15, color: INK, cursor: 'text', padding: '4px 2px' }}>
                {currentTeam.name}
              </button>
            )}
            <button onClick={() => setShowTeamsMenu(v => !v)} style={{ all: 'unset', cursor: 'pointer', fontSize: 10, color: INK3, padding: '4px 5px', lineHeight: 1 }}>▾</button>
          </div>

          {/* Format pill */}
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 13px', borderRadius: 999, background: activeAccent + '22', border: `1px solid ${activeAccent}44`, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: activeAccent, whiteSpace: 'nowrap' }}
          >
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', opacity: 0.7 }}>FORMAT</span>
            <span>{currentGame?.name}</span>
          </button>

          <div style={{ flex: 1 }} />

          {/* Builder / Overview toggle */}
          <div style={{ display: 'flex', background: 'rgba(22,36,27,0.06)', border: `1px solid ${BORDER}`, borderRadius: 10, padding: 3, gap: 2 }}>
            {(['builder', 'overview'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 15px', borderRadius: 8, fontSize: 12.5, fontWeight: view === v ? 700 : 600, cursor: 'pointer', border: 'none', background: view === v ? '#fff' : 'transparent', color: view === v ? INK : INK3, boxShadow: view === v ? '0 1px 3px rgba(0,0,0,.08)' : 'none', textTransform: 'capitalize' }}>
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTeamModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, background: 'rgba(22,36,27,0.05)', border: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: INK2, cursor: 'pointer' }}
          >
            + New team
          </button>
        </header>

        {/* Teams dropdown */}
        {showTeamsMenu && (
          <>
            <div onClick={() => setShowTeamsMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 42, animation: 'fadeIn .1s' }} />
            <div style={{ position: 'fixed', left: 200, top: 58, width: 300, zIndex: 43, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14, boxShadow: '0 16px 44px rgba(0,0,0,.18)', animation: 'pop .14s', paddingBottom: 8 }}>
              <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.1em', color: INK3 }}>YOUR TEAMS</span>
                <span style={{ fontFamily: MONO, fontSize: 10, color: INK3 }}>{teams.length}</span>
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto', padding: '0 6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {teams.map(t => (
                  <div key={t.id} onClick={() => { setCurrentTeamId(t.id); setActiveSlot(0); setShowTeamsMenu(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, cursor: 'pointer', border: `1px solid ${t.id === currentTeamId ? activeAccent + '44' : 'transparent'}`, background: t.id === currentTeamId ? activeAccent + '14' : 'transparent' }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: activeAccent, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: INK3 }}>{GAMES_AND_FORMATS.find(g => g.id === t.game)?.name} · {t.pokemon.filter(Boolean).length}/6</div>
                    </div>
                    {teams.length > 1 && (
                      <button onClick={e => { e.stopPropagation(); deleteTeam(t.id); }} style={{ all: 'unset', cursor: 'pointer', fontSize: 11, color: INK3, padding: '2px 5px', borderRadius: 5 }}>✕</button>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ padding: '8px 8px 2px', borderTop: `1px solid ${BORDER}`, marginTop: 4, display: 'flex', gap: 7 }}>
                <button onClick={() => { setShowTeamModal(true); setShowTeamsMenu(false); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px', borderRadius: 10, background: activeAccent, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  ＋ New empty team
                </button>
              </div>
            </div>
          </>
        )}

        {/* Builder view */}
        {view === 'builder' && (
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, padding: '20px 24px 32px', minHeight: 0 }}>

            {/* Left: team slots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px 4px' }}>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: '.1em', color: INK3 }}>YOUR TEAM</span>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: INK2 }}>{filledPokemon.length}/6</span>
              </div>

              {currentTeam.pokemon.map((pokemon, index) => {
                const isActive = index === activeSlot;
                const slotAccent = pokemon ? (TYPE_COLORS[pokemon.types[0]?.toLowerCase()] ?? ACCENT) : ACCENT;
                return (
                  <div key={index}>
                    {pokemon ? (
                      <div
                        className="slot-row"
                        onClick={() => setActiveSlot(index)}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 14, cursor: 'pointer', background: isActive ? slotAccent + '22' : PANEL, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${isActive ? slotAccent : BORDER}`, boxShadow: isActive ? `0 2px 10px ${slotAccent}44` : '0 2px 10px rgba(22,36,27,0.05)' }}
                      >
                        <SpriteBox pokemon={pokemon} size={46} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pokemon.name}</div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                            {pokemon.types.map(t => <TypeBadge key={t} type={t} mini />)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
                          <button onClick={e => { e.stopPropagation(); updateTeamPokemon(index, null); if (isActive) setActiveSlot(0); }} style={{ all: 'unset', cursor: 'pointer', width: 22, height: 22, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK3, fontSize: 11 }}>✕</button>
                          <span style={{ fontFamily: MONO, fontSize: 9.5, color: INK3 }}>{pokemon.item !== 'None' ? pokemon.item.slice(0, 14) : ''}</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingToSlot(index); setShowPokemonModal(true); setSearchQuery(''); }}
                        style={{ all: 'unset', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, border: `1.5px dashed ${BORDER}`, color: INK3, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .12s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; (e.currentTarget as HTMLElement).style.background = ACCENT + '10'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = INK3; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: 16 }}>＋</span> Add Pokémon
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Format selector */}
              <div style={{ marginTop: 4, background: PANEL, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 15px' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.09em', color: INK3, marginBottom: 10 }}>FORMAT</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {GAMES_AND_FORMATS.map(g => (
                    <button key={g.id} onClick={() => setTeams(teams.map(t => t.id === currentTeamId ? { ...t, game: g.id } : t))} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: `1px solid ${currentTeam.game === g.id ? activeAccent + '55' : BORDER}`, background: currentTeam.game === g.id ? activeAccent + '12' : 'transparent', transition: 'all .12s' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentTeam.game === g.id ? activeAccent : BORDER, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: currentTeam.game === g.id ? INK : INK2 }}>{g.name}</div>
                        <div style={{ fontFamily: MONO, fontSize: 10, color: INK3, marginTop: 1 }}>{g.format}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: active pokemon detail or empty state */}
            <div style={{ minHeight: 0, overflowY: 'auto' }}>
              {!activePokemon ? (
                <div style={{ height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, background: PANEL, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1.5px dashed ${BORDER}`, borderRadius: 18, padding: 40 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: ACCENT + '18', border: `1px solid ${ACCENT}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, fontSize: 32 }}>＋</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 22, color: INK, letterSpacing: '-0.02em' }}>Start building</div>
                    <div style={{ fontSize: 14, color: INK2, maxWidth: 340, marginTop: 6, lineHeight: 1.5 }}>Add up to six Pokémon, then dial in their moves, items, and EVs.</div>
                  </div>
                  <button onClick={() => { setAddingToSlot(0); setShowPokemonModal(true); setSearchQuery(''); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 11, background: ACCENT, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `0 6px 18px -6px ${ACCENT}` }}>
                    <span style={{ fontSize: 16 }}>＋</span> Add your first Pokémon
                  </button>
                </div>
              ) : (
                <div style={{ background: PANEL, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>

                  {/* Header: big sprite + name + types */}
                  {(() => {
                    const c1 = TYPE_COLORS[activePokemon.types[0]?.toLowerCase()] ?? activeAccent;
                    const c2 = TYPE_COLORS[activePokemon.types[1]?.toLowerCase()] ?? c1;
                    const pd = POKEMON_DATABASE.find(p => p.id === parseInt(activePokemon.id));
                    return (
                      <div style={{ position: 'relative', padding: '22px 24px', background: `linear-gradient(165deg,${c1}22,transparent 75%)`, borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                        <div style={{ position: 'relative', width: 92, height: 92, borderRadius: 18, flexShrink: 0, overflow: 'hidden', background: `linear-gradient(150deg,${c1},${c2})`, boxShadow: `0 6px 18px ${c1}40` }}>
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.10) 0 7px,transparent 7px 14px)' }} />
                          {activePokemon.sprite && (
                            <img src={activePokemon.sprite} alt={activePokemon.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18) translateY(-3%)', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.28))' }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <h1 style={{ fontWeight: 700, fontSize: 27, letterSpacing: '-0.02em', margin: 0, color: INK }}>{activePokemon.name}</h1>
                            {pd && <span style={{ fontFamily: MONO, fontSize: 12, color: INK3, fontWeight: 500 }}>#{String(pd.id).padStart(4, '0')}</span>}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9, flexWrap: 'wrap' }}>
                            {activePokemon.types.map(t => <TypeBadge key={t} type={t} />)}
                          </div>
                        </div>
                        <button onClick={() => { setAddingToSlot(activeSlot); setShowPokemonModal(true); setSearchQuery(''); }} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.7)', border: `1px solid ${BORDER}`, fontSize: 12.5, fontWeight: 700, color: INK2, cursor: 'pointer', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>Change ⇄</button>
                      </div>
                    );
                  })()}

                  {/* Item + Ability */}
                  <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, borderBottom: `1px solid ${BORDER}` }}>
                    {[
                      { label: 'ITEM', value: activePokemon.item, onClick: () => openEdit(activeSlot) },
                      { label: 'ABILITY', value: activePokemon.ability, onClick: () => openEdit(activeSlot) },
                    ].map(({ label, value, onClick }) => (
                      <button key={label} onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'border-color .12s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,36,27,0.2)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}>
                        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3 }}>{label}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{value}</span>
                      </button>
                    ))}
                  </div>

                  {/* Moves */}
                  <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: '.09em', color: INK3, marginBottom: 13 }}>MOVES</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                      {[0, 1, 2, 3].map(mi => {
                        const moveName = activePokemon.moves[mi] || '';
                        const moveColor = activeAccent;
                        return (
                          <button key={mi} className="move-btn" onClick={() => openEdit(activeSlot)} style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 11, overflow: 'hidden', cursor: 'pointer', height: 50 }}>
                            <div style={{ width: 5, alignSelf: 'stretch', background: moveName ? moveColor : 'rgba(22,36,27,0.12)', flexShrink: 0 }} />
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 13px', minWidth: 0 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: moveName ? INK : INK3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {moveName || '—'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* EV Spread */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: '.09em', color: INK3 }}>EV SPREAD</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button onClick={() => openEdit(activeSlot)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 9, padding: '7px 12px', cursor: 'pointer' }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{activePokemon.nature}</span>
                          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: INK3 }}>{NATURE_EFFECTS[activePokemon.nature]?.note || 'Neutral'}</span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: INK3 }}>EVs</span>
                          <div style={{ width: 88, height: 7, borderRadius: 5, background: 'rgba(22,36,27,0.07)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(100, (Object.values(activePokemon.evs).reduce((a, b) => a + b, 0) / 508) * 100)}%`, background: activeAccent, borderRadius: 5, transition: 'width .15s' }} />
                          </div>
                          <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: INK }}>
                            {Object.values(activePokemon.evs).reduce((a, b) => a + b, 0)}<span style={{ color: INK3 }}>/508</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {STAT_KEYS.map(k => {
                        const ev = activePokemon.evs[k];
                        const sign = natEffect(activePokemon.nature, k);
                        const pct = Math.min(100, (ev / 252) * 100);
                        return (
                          <div key={k} style={{ display: 'grid', gridTemplateColumns: '74px 1fr 118px', alignItems: 'center', gap: 15, padding: '5px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: INK2, width: 30 }}>{STAT_LABELS[k]}</span>
                              <span style={{ fontSize: 14, fontWeight: 800, color: sign === '+' ? '#3fae6a' : sign === '−' ? '#e0533d' : 'transparent', width: 10 }}>{sign || '·'}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                              <div style={{ height: 7, borderRadius: 5, background: 'rgba(22,36,27,0.07)', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${pct}%`, background: activeAccent, borderRadius: 5, transition: 'width .15s' }} />
                              </div>
                              <input type="range" min={0} max={252} step={4} value={ev}
                                onChange={e => {
                                  const p = { ...activePokemon, evs: { ...activePokemon.evs, [k]: +e.target.value } };
                                  const total = Object.values(p.evs).reduce((a, b) => a + b, 0);
                                  if (total <= 510) updateTeamPokemon(activeSlot, p);
                                }}
                                style={{ width: '100%', height: 14, cursor: 'pointer' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 9 }}>
                              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: INK3, width: 48, textAlign: 'right' }}>EV {ev}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button onClick={() => openEdit(activeSlot)} style={{ marginTop: 16, width: '100%', padding: '12px', borderRadius: 12, background: activeAccent, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `0 6px 18px -6px ${activeAccent}` }}>
                      Edit details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overview view */}
        {view === 'overview' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {filledPokemon.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 40px', color: INK3, fontSize: 15 }}>No Pokémon yet. Switch to Builder to add some.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {currentTeam.pokemon.map((pokemon, i) => {
                    if (!pokemon) return (
                      <button key={i} onClick={() => { setAddingToSlot(i); setShowPokemonModal(true); setSearchQuery(''); }} style={{ all: 'unset', cursor: 'pointer', minHeight: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: 16, border: `1.5px dashed ${BORDER}`, color: INK2, fontSize: 13, fontWeight: 700, transition: 'all .12s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.color = ACCENT; (e.currentTarget as HTMLElement).style.background = ACCENT + '10'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = INK2; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: 26, fontWeight: 300 }}>＋</span> Add Pokémon
                      </button>
                    );
                    const c1 = TYPE_COLORS[pokemon.types[0]?.toLowerCase()] ?? ACCENT;
                    const c2 = TYPE_COLORS[pokemon.types[1]?.toLowerCase()] ?? c1;
                    return (
                      <div key={i} onClick={() => { setActiveSlot(i); setView('builder'); }} style={{ background: PANEL, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform .12s, box-shadow .12s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px rgba(0,0,0,.09)`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                      >
                        {/* Card header */}
                        <div style={{ position: 'relative', padding: '15px 16px', background: `linear-gradient(150deg,${c1}1e,transparent 80%)`, display: 'flex', gap: 13, alignItems: 'center', borderBottom: `1px solid ${BORDER}` }}>
                          <SpriteBox pokemon={pokemon} size={52} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 16, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pokemon.name}</div>
                            <div style={{ display: 'flex', gap: 5, marginTop: 5, alignItems: 'center', flexWrap: 'wrap' }}>
                              {pokemon.types.map(t => <TypeBadge key={t} type={t} mini />)}
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                          {/* Item + Ability */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                            <span style={{ fontWeight: 700, color: INK2 }}>{pokemon.item !== 'None' ? pokemon.item : '—'}</span>
                            <span style={{ color: INK3 }}>·</span>
                            <span style={{ fontWeight: 600, color: INK3 }}>{pokemon.ability}</span>
                          </div>

                          {/* Moves */}
                          {pokemon.moves && pokemon.moves.some(m => m) && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                              {pokemon.moves.map((mv, mi) => (
                                <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                  <div style={{ width: 8, height: 8, borderRadius: 3, background: mv ? c1 : 'rgba(22,36,27,0.12)', flexShrink: 0 }} />
                                  <span style={{ fontSize: 11.5, fontWeight: 600, color: mv ? INK2 : INK3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mv || '—'}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* EV sparkbars */}
                          <div style={{ display: 'flex', gap: 4 }}>
                            {STAT_KEYS.map(k => {
                              const pct = Math.min(100, (pokemon.evs[k] / 252) * 100);
                              return (
                                <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                  <div style={{ width: '100%', height: 38, borderRadius: 4, background: 'rgba(22,36,27,0.06)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: pct + '%', background: c1, borderRadius: '3px 3px 0 0' }} />
                                  </div>
                                  <span style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 700, color: INK3 }}>{STAT_LABELS[k]}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pokemon Selection Modal */}
        {showPokemonModal && (
          <div onClick={() => { setShowPokemonModal(false); setAddingToSlot(null); }} style={{ position: 'fixed', inset: 0, background: 'rgba(22,32,25,0.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .15s' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 720, maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,.22)', animation: 'pop .16s' }}>
              <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.09em', color: INK3, marginBottom: 4 }}>ADD POKÉMON · SLOT {(addingToSlot ?? activeSlot) + 1}</div>
                    <div style={{ fontWeight: 600, fontSize: 18, color: INK }}>{currentGame?.name}</div>
                  </div>
                  <button onClick={() => { setShowPokemonModal(false); setAddingToSlot(null); }} style={{ all: 'unset', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: INK2 }}>✕</button>
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: INK3 }}>🔍</span>
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus placeholder="Search Pokémon…" style={{ width: '100%', padding: '9px 12px 9px 34px', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, fontWeight: 500, color: INK, background: 'rgba(22,36,27,0.04)', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ overflowY: 'auto', padding: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                {filteredPokemon.map(p => {
                  const avail = p.availableIn.includes(currentTeam.game);
                  const c1 = TYPE_COLORS[p.types[0]?.toLowerCase()] ?? ACCENT;
                  const c2 = TYPE_COLORS[p.types[1]?.toLowerCase()] ?? c1;
                  return (
                    <button key={p.id} onClick={() => avail && selectPokemon(p)} disabled={!avail} style={{ all: 'unset', cursor: avail ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 10px', borderRadius: 12, border: `1px solid ${avail ? BORDER : 'rgba(22,36,27,0.06)'}`, background: 'rgba(22,36,27,0.02)', opacity: avail ? 1 : 0.4, transition: 'border-color .12s, background .12s' }}
                      onMouseEnter={e => avail && ((e.currentTarget as HTMLElement).style.borderColor = c1, (e.currentTarget as HTMLElement).style.background = c1 + '14')}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.background = 'rgba(22,36,27,0.02)'; }}
                    >
                      <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 14, background: `linear-gradient(140deg,${c1},${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.1) 0 4px,transparent 4px 9px)' }} />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt={p.name} width={64} height={64} style={{ position: 'relative', imageRendering: 'pixelated', transform: 'scale(1.15)' }} />
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 12, color: INK, textAlign: 'center' }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {p.types.map(t => <TypeBadge key={t} type={t} mini />)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal — item, ability, nature, moves, EV spreads */}
        {showEditModal && editingPokemon && (
          <div onClick={() => setShowEditModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(22,32,25,0.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .15s' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,.22)', animation: 'pop .16s' }}>
              {(() => {
                const c1 = TYPE_COLORS[editingPokemon.types[0]?.toLowerCase()] ?? ACCENT;
                const c2 = TYPE_COLORS[editingPokemon.types[1]?.toLowerCase()] ?? c1;
                return (
                  <div style={{ padding: '22px 24px', background: `linear-gradient(165deg,${c1}22,transparent 75%)`, borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <SpriteBox pokemon={editingPokemon} size={80} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{ fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', margin: '0 0 10px', color: INK }}>{editingPokemon.name}</h2>
                      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                        {editingPokemon.types.map(t => <TypeBadge key={t} type={t} />)}
                      </div>
                    </div>
                    <button onClick={() => setShowEditModal(false)} style={{ all: 'unset', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: INK2, flexShrink: 0 }}>✕</button>
                  </div>
                );
              })()}

              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Item & Ability */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'ITEM', value: editingPokemon.item, opts: ITEMS, onChange: (v: string) => setEditingPokemon({ ...editingPokemon, item: v }) },
                    { label: 'ABILITY', value: editingPokemon.ability, opts: (POKEMON_DATABASE.find(p => p.id === parseInt(editingPokemon.id))?.abilities ?? [editingPokemon.ability]), onChange: (v: string) => setEditingPokemon({ ...editingPokemon, ability: v }) },
                  ].map(({ label, value, opts, onChange }) => (
                    <div key={label} style={{ background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '12px 14px' }}>
                      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3, marginBottom: 6 }}>{label}</div>
                      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 600, color: INK, fontFamily: 'inherit', cursor: 'pointer', outline: 'none' }}>
                        {opts.map((o: string) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Moves */}
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3, marginBottom: 10 }}>MOVES</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[0, 1, 2, 3].map(mi => {
                      const movePool: string[] = [];
                      const c1 = TYPE_COLORS[editingPokemon.types[0]?.toLowerCase()] ?? ACCENT;
                      const currentMove = editingPokemon.moves[mi] || '';
                      return (
                        <div key={mi} style={{ background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
                          <div style={{ width: 5, background: currentMove ? c1 : 'rgba(22,36,27,0.1)', flexShrink: 0 }} />
                          <div style={{ flex: 1, padding: '8px 10px' }}>
                            <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: '.08em', color: INK3, marginBottom: 4 }}>MOVE {mi + 1}</div>
                            {movePool.length > 0 ? (
                              <select value={currentMove} onChange={e => { const nm = [...editingPokemon.moves]; nm[mi] = e.target.value; setEditingPokemon({ ...editingPokemon, moves: nm }); }} style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, color: currentMove ? INK : INK3, fontFamily: 'inherit', cursor: 'pointer', outline: 'none' }}>
                                <option value="">—</option>
                                {movePool.map((m: string) => <option key={m} value={m}>{m}</option>)}
                              </select>
                            ) : (
                              <input value={currentMove} onChange={e => { const nm = [...editingPokemon.moves]; nm[mi] = e.target.value; setEditingPokemon({ ...editingPokemon, moves: nm }); }} placeholder="Move name" style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, color: INK, fontFamily: 'inherit', outline: 'none' }} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Nature */}
                <div style={{ background: 'rgba(22,36,27,0.04)', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3, marginBottom: 6 }}>NATURE</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <select value={editingPokemon.nature} onChange={e => setEditingPokemon({ ...editingPokemon, nature: e.target.value })} style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, fontWeight: 600, color: INK, fontFamily: 'inherit', cursor: 'pointer', outline: 'none' }}>
                      {NATURES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: INK3 }}>
                      {NATURE_EFFECTS[editingPokemon.nature]?.note || 'Neutral'}
                    </span>
                  </div>
                </div>

                {/* EV Spreads */}
                {(() => {
                  const pd = POKEMON_DATABASE.find(p => p.id === parseInt(editingPokemon.id));
                  if (!pd?.commonSpreads?.length) return null;
                  return (
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.09em', color: INK3, marginBottom: 10 }}>POPULAR EV SPREADS</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {pd.commonSpreads.map((sp, i) => (
                          <button key={i} onClick={() => applyEVSpread(sp)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 13px', borderRadius: 11, border: `1px solid ${BORDER}`, background: 'rgba(22,36,27,0.03)', transition: 'border-color .12s, background .12s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.background = ACCENT + '10'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.background = 'rgba(22,36,27,0.03)'; }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontWeight: 600, fontSize: 13, color: INK }}>{sp.name}</span>
                              <span style={{ fontFamily: MONO, fontSize: 10, color: INK3 }}>{sp.hp + sp.atk + sp.def + sp.spa + sp.spd + sp.spe} EVs</span>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {STAT_KEYS.filter(k => sp[k] > 0).map(k => (
                                <span key={k} style={{ fontFamily: MONO, fontSize: 10, padding: '2px 7px', borderRadius: 5, background: 'rgba(22,36,27,0.07)', color: INK2 }}>{sp[k]} {STAT_LABELS[k]}</span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* EV Sliders */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.09em', color: INK3 }}>EV SPREAD</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 80, height: 6, borderRadius: 4, background: 'rgba(22,36,27,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, (totalEvs / 508) * 100)}%`, background: totalEvs > 508 ? '#e0533d' : ACCENT, borderRadius: 4, transition: 'width .15s' }} />
                      </div>
                      <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: totalEvs > 508 ? '#e0533d' : totalEvs === 508 ? '#3fae6a' : INK }}>{totalEvs}<span style={{ color: INK3 }}>/508</span></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {STAT_KEYS.map(k => (
                      <div key={k} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px', alignItems: 'center', gap: 14, padding: '4px 0' }}>
                        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: INK2 }}>{STAT_LABELS[k]}</span>
                        <input type="range" min={0} max={252} step={4} value={editingPokemon.evs[k]} onChange={e => updateEV(k, +e.target.value)} style={{ width: '100%', cursor: 'pointer' }} />
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 6 }}>
                          <span style={{ fontFamily: MONO, fontSize: 11, color: INK3 }}>EV</span>
                          <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: INK }}>{editingPokemon.evs[k]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={saveEditedPokemon} style={{ width: '100%', padding: '14px', borderRadius: 12, background: ACCENT, color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: `0 8px 22px -8px ${ACCENT}` }}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Team Modal */}
        {showTeamModal && (
          <div onClick={() => { setShowTeamModal(false); setNewTeamName(''); }} style={{ position: 'fixed', inset: 0, background: 'rgba(22,32,25,0.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .15s' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, padding: '28px 28px 24px', boxShadow: '0 24px 64px rgba(0,0,0,.22)', animation: 'pop .16s' }}>
              <h2 style={{ fontWeight: 700, fontSize: 22, color: INK, margin: '0 0 22px', letterSpacing: '-0.02em' }}>New team</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3, display: 'block', marginBottom: 7 }}>TEAM NAME</label>
                  <input autoFocus value={newTeamName} onChange={e => setNewTeamName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createTeam()} placeholder="e.g. Rain Balance, Trick Room…" style={{ width: '100%', padding: '10px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, fontWeight: 500, color: INK, outline: 'none', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '.08em', color: INK3, display: 'block', marginBottom: 7 }}>FORMAT</label>
                  <select value={newTeamGame} onChange={e => setNewTeamGame(e.target.value)} style={{ width: '100%', padding: '10px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, fontWeight: 500, color: INK, background: '#fff', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
                    {GAMES_AND_FORMATS.map(g => <option key={g.id} value={g.id}>{g.name} — {g.format}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button onClick={createTeam} style={{ flex: 1, padding: '12px', borderRadius: 11, background: ACCENT, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Create team</button>
                  <button onClick={() => { setShowTeamModal(false); setNewTeamName(''); }} style={{ flex: 1, padding: '12px', borderRadius: 11, border: `1px solid ${BORDER}`, color: INK2, fontSize: 14, fontWeight: 600, background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
