export interface Favorite {
  /** Small label above the title, e.g. "Album". */
  category: string;
  title: string;
  /** Artist, author, etc. */
  by?: string;
  /** Image in /public. Without one, the frame is a colored block. */
  image?: string;
  /** Opens in a new tab when set. */
  href?: string;
  /** Frame shape: wide 16:9 for videos, a tall 2:3 poster or cover, or a square album. */
  shape: 'wide' | 'poster' | 'square';
  /** Background for items without an image (a CSS gradient). */
  gradient?: string;
  /** Which of the 4 columns it sits in on wide screens (top to bottom in list order). */
  column: 1 | 2 | 3 | 4;
}

/** My favorite things on /interests, one window each. Listed row by row; `column` places them on wide screens. */
export const favorites: Favorite[] = [
  // Top of each column: a mix of shapes so the page staggers.
  {
    category: 'YouTube video',
    title: '1000 Players Simulate Civilization: Rich & Poor',
    by: 'ish',
    image: '/favorites/video.jpg',
    href: 'https://www.youtube.com/watch?v=ef568d0CrRY&t=6s',
    shape: 'wide',
    column: 1,
  },
  { category: 'Game', title: 'Overwatch', by: 'Blizzard', image: '/favorites/overwatch.jpg', shape: 'poster', column: 2 },
  { category: 'Album', title: '1989', by: 'Taylor Swift', image: '/favorites/1989.jpg', shape: 'square', column: 3 },
  { category: 'Show', title: 'Emily in Paris', image: '/favorites/emily.jpg', shape: 'poster', column: 4 },
  // Bottom of each column.
  { category: 'Book', title: 'Babel', by: 'R. F. Kuang', image: '/favorites/babel.jpg', shape: 'poster', column: 1 },
  { category: 'Song', title: 'Moonlight', by: 'Ariana Grande', image: '/favorites/moonlight.jpg', shape: 'square', column: 2 },
  { category: 'Movie', title: 'La La Land', by: 'Damien Chazelle', image: '/favorites/lalaland.jpg', shape: 'poster', column: 3 },
  {
    category: 'Piece',
    title: 'Brahms: Violin Concerto',
    by: 'Hilary Hahn · Frankfurt Radio Symphony',
    image: '/favorites/brahms-video.jpg',
    href: 'https://www.youtube.com/watch?v=UFl9xuYP5T8&t=510s',
    shape: 'wide',
    column: 4,
  },
];
