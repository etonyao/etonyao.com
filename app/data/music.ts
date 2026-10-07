export interface Track {
  title: string;
  artist: string;
  /** Audio file in /public, e.g. '/music/song.mp3'. */
  src: string;
  /** Optional cover art in /public, e.g. '/music/song.jpg'. */
  cover?: string;
}

/** Favorite tracks for the shuffle player on the home page. Empty hides the section. */
export const tracks: Track[] = [
  { title: 'Reunion (Mipha)', artist: 'The Legend of Zelda: Breath of the Wild', src: '/music/reunion-mipha.mp3', cover: '/music/reunion-mipha.jpg' },
  { title: 'Main Theme', artist: 'Manaka Kataoka · Breath of the Wild', src: '/music/main-theme.mp3', cover: '/music/main-theme.jpg' },
  { title: 'A MEGALOVANIA', artist: 'Mar Mar, ChezzarCat · Undertale', src: '/music/megalovania.mp3', cover: '/music/megalovania.jpg' },
  { title: 'Battle! (Lorekeeper Zinnia)', artist: 'Shota Kageyama · Pokémon Omega Ruby & Alpha Sapphire', src: '/music/battle-zinnia.mp3', cover: '/music/battle-zinnia.jpg' },
  { title: 'Verdanturf Town', artist: 'Shota Kageyama · Pokémon Omega Ruby & Alpha Sapphire', src: '/music/verdanturf-town.mp3', cover: '/music/verdanturf-town.jpg' },
  { title: 'Petalburg City', artist: 'Minako Adachi · Pokémon Omega Ruby & Alpha Sapphire', src: '/music/petalburg-city.mp3', cover: '/music/petalburg-city.jpg' },
  { title: 'Hiun City', artist: 'Shota Kageyama · Pokémon Black & White', src: '/music/hiun-city.mp3', cover: '/music/hiun-city.jpg' },
];
