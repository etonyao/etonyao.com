export interface ProductLink { label: string; href: string; primary?: boolean }

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  platforms: string[];
  role: string;
  stack: string[];
  /** When set, the stack gets its own section with this heading (e.g. 'Tech stack') instead of sitting under My role. */
  stackTitle?: string;
  links: ProductLink[];
  image: string;
  imageAlt: string;
  /** Optional wide image for the home-page card, if different from `image`. */
  cardImage?: string;
  /** A YouTube/Vimeo link, or a video file path like '/videos/joystick.mp4'. Empty shows a "coming soon" frame. */
  video?: string;
  /** Extra videos shown under the main one: a heading and a YouTube/Vimeo link or file path. */
  moreVideos?: { heading: string; url: string }[];
  /** Why I made it, in my own words. One string per paragraph. Hidden until filled in. */
  why?: string[];
  features: string[];
}

export const products: Product[] = [
  {
    slug: 'joystick',
    name: 'Joystick',
    tagline: 'Log and review the games you play.',
    description:
      'A social app for logging the games you play. Rate them, write reviews, follow friends and see what everyone is playing, on the web and on iPhone.',
    status: 'Live',
    platforms: ['Web', 'iOS'],
    role: 'Product, design and engineering',
    stack: ['Next.js', 'Expo / React Native', 'Prisma', 'Neon Postgres', 'Clerk', 'shadcn/ui', 'Vercel'],
    stackTitle: 'Tech stack',
    links: [
      { label: 'Open Joystick', href: 'https://web-jet-nu-77nsp8th5d.vercel.app', primary: true },
      { label: 'Source on GitHub', href: 'https://github.com/etonyao/joystick' },
    ],
    image: '/products/joystick/icon.png',
    imageAlt: 'Joystick app icon: a red joystick ball on a dark green stick',
    video: 'https://www.youtube.com/watch?v=noeTTnTgugc',
    moreVideos: [{ heading: 'Related video', url: 'https://www.youtube.com/watch?v=F-CvM4s21P0' }],
    features: [
      'Log games with a status (playing, finished, dropped, want to play), a rating, minutes played, a review and a photo',
      'Game search powered by IGDB, with a dropdown of suggestions and custom games for anything not in the database',
      'A feed of what the people you follow are playing, plus a popular tab',
      'Likes, comments and follows with push notifications on iPhone',
      'Profiles with a bio, avatar and a showcase of your top games',
    ],
  },
  {
    slug: 'potion-problems',
    name: 'Potion Problems',
    tagline: 'A game from the USC Advanced Games Project, now on Steam.',
    description:
      'A student-developed game released on Steam. I led marketing, taking it from an unknown project to a published game with an official trailer and launch campaign.',
    status: 'Released on Steam',
    platforms: ['PC'],
    role: 'Marketing Lead, USC Advanced Games Project',
    stack: ['Steam', 'Trailer production', 'Cross-team coordination'],
    links: [
      { label: 'View on Steam', href: 'https://store.steampowered.com/app/3306050/Potion_Problems/', primary: true },
      { label: 'Read the case study', href: '/work/potion-problems' },
    ],
    image: '/documents/potion-problems.jpg',
    imageAlt: 'Potion Problems key art',
    video: 'https://www.youtube.com/watch?v=J7WEbRuXfkw',
    features: [
      'Official game trailer and launch campaign',
      'Steam store page messaging and positioning',
      'Cross-team asset pipeline for art, audio, design and engineering',
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
