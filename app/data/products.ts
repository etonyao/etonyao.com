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
  links: ProductLink[];
  image: string;
  imageAlt: string;
  highlights: { n: string; label: string }[];
  problem: string;
  approach: string[];
  features: string[];
}

export const products: Product[] = [
  {
    slug: 'joystick',
    name: 'Joystick',
    tagline: 'Letterboxd for video games.',
    description:
      'A social app for logging the games you play. Rate them, write reviews, follow friends and see what everyone is playing, on the web and on iPhone.',
    status: 'Live',
    platforms: ['Web', 'iOS'],
    role: 'Product, design and engineering',
    stack: ['Next.js', 'Expo / React Native', 'Prisma', 'Neon Postgres', 'Clerk', 'shadcn/ui', 'Vercel'],
    links: [
      { label: 'Open Joystick', href: 'https://web-jet-nu-77nsp8th5d.vercel.app', primary: true },
      { label: 'Source on GitHub', href: 'https://github.com/etonyao/joystick' },
    ],
    image: '/products/joystick/icon.png',
    imageAlt: 'Joystick app icon: a red joystick ball on a dark green stick',
    highlights: [
      { n: '2', label: 'platforms from one backend' },
      { n: '4', label: 'ways to sign in: email, username, Google, Apple' },
      { n: '3', label: 'push notification types' },
    ],
    problem:
      'Gamers keep backlogs, half-finished playthroughs and opinions in their heads, in notes apps or scattered across storefronts. There is no simple, social place to log what you played and see what your friends think.',
    approach: [
      'Started from one question: what is the fastest way to log a game in under 30 seconds? That led to a search dropdown, a one-tap status and a rating, with everything else optional.',
      'One shared backend, so the website and the iPhone app show the same feed, profiles and notifications.',
      'Made sign-in forgiving: sign up with just a username, or add an email for password resets, or continue with Google or Apple.',
      'Added the trust and safety basics early: report and block tools, in-app account deletion and privacy and terms pages.',
    ],
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
    highlights: [
      { n: '8', label: 'teams coordinated' },
      { n: 'Steam', label: 'published' },
      { n: 'On time', label: 'trailer delivery' },
    ],
    problem:
      'A student-developed game had to find an audience from scratch with no budget, only student talent and the ability to coordinate many teams.',
    approach: [
      'Defined the positioning and key messaging so every asset told the same story.',
      'Coordinated asset delivery across 8 cross-functional teams.',
      'Produced and launched the official trailer on deadline for the Steam release.',
    ],
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
