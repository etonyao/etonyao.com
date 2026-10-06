import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Headliners — Five stories that defined the week',
  description: 'A curated weekly digest of the five stories that defined the week.',
};

interface Story {
  category: string;
  source: string;
  headline: string;
  url: string;
  isLead?: boolean;
}

const stories: Story[] = [
  {
    category: 'Politics',
    source: 'NPR',
    headline: 'U.S. and Iran Announce Initial Deal to End the War and Reopen the Strait of Hormuz',
    url: 'https://www.npr.org/2026/06/15/nx-s1-5858590/us-iran-deal-updates',
    isLead: true,
  },
  {
    category: 'Sports',
    source: 'ESPN',
    headline: "Cape Verde Stuns Spain 0–0 in World Cup's Biggest Shock as 40-Year-Old Goalkeeper Saves Seven",
    url: 'https://www.espn.com/soccer/story/_/id/49079625/world-cup-2026-today-blog-16-06-2026-live-updates-news-fixtures-schedule-france-senegal',
  },
  {
    category: 'Pop Culture',
    source: 'NBC News',
    headline: 'David Hockney, Giant of British Contemporary Art, Dies at 88',
    url: 'https://www.nbcnews.com/pop-culture/pop-culture-news/david-hockney-giant-british-art-dies-rcna349756',
  },
  {
    category: 'Politics',
    source: 'NPR',
    headline: "Kennedy Center Removes Trump's Name from Building After Court-Ordered Deadline",
    url: 'https://www.npr.org/2026/06/12/g-s1-128017/kennedy-center-trump-name-remove',
  },
  {
    category: 'Politics',
    source: 'NPR',
    headline: "As Luigi Mangione's Lawyers Head to Court, Support Grows for the Accused 'Vigilante'",
    url: 'https://www.npr.org/2026/06/15/nx-s1-5853110/luigi-mangione-court-hearings-growing-support',
  },
];

export default function HeadlinersPage() {
  const lead = stories.find((s) => s.isLead)!;
  const rest = stories.filter((s) => !s.isLead);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Archivo:wght@500;600;700&display=swap');

        body { margin: 0; }
        *, *::before, *::after { box-sizing: border-box; }

        .hl-row { transition: background-color .18s ease, color .18s ease; }
        .hl-row:hover { background-color: rgba(0,0,0,0.035); color: #99241b; }
        .hl-arrow { opacity: 0; transform: translateX(-4px); transition: opacity .18s ease, transform .18s ease; }
        .hl-row:hover .hl-arrow { opacity: 1; transform: translateX(0); }
      `}</style>

      <div style={{
        background: '#f1ece0',
        color: '#1b1a17',
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Libre Caslon Text', Georgia, serif",
        padding: 'clamp(20px, 4vw, 56px) clamp(16px, 5vw, 40px)',
      }}>
        <div style={{
          maxWidth: 940,
          margin: '0 auto',
          background: '#faf7ef',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 22px 50px -30px rgba(0,0,0,0.28)',
          padding: 'clamp(22px, 4.5vw, 60px) clamp(18px, 4.5vw, 64px) clamp(28px, 4vw, 52px)',
        }}>

          {/* Folio line */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(9.5px, 1.4vw, 11px)',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6b6760',
            paddingBottom: 12,
          }}>
            <span>Vol. I &nbsp;·&nbsp; No. 24</span>
            <span style={{ textAlign: 'center' }}>The Weekly Edition</span>
            <span style={{ textAlign: 'right' }}>June 16, 2026</span>
          </div>

          {/* Masthead */}
          <div style={{ borderTop: '1px solid #1b1a17', paddingTop: 'clamp(14px, 2.6vw, 26px)' }}>
            <h1 style={{
              margin: 0,
              fontFamily: "'Libre Caslon Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(46px, 14vw, 138px)',
              lineHeight: 0.9,
              letterSpacing: '-0.012em',
              textAlign: 'center',
              color: '#15140f',
            }}>
              Headliners
            </h1>
          </div>

          <div style={{
            borderTop: '3px double #1b1a17',
            borderBottom: '3px double #1b1a17',
            marginTop: 'clamp(14px, 2.4vw, 22px)',
            padding: '9px 0',
            textAlign: 'center',
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(10px, 1.5vw, 12.5px)',
            fontWeight: 600,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#3a382f',
          }}>
            Five stories that defined the week
          </div>

          {/* Entries */}
          <div style={{ marginTop: 'clamp(10px, 2vw, 22px)' }}>

            {/* Lead story */}
            <a
              className="hl-row"
              href={lead.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                padding: 'clamp(26px, 3.4vw, 40px) clamp(8px, 1.6vw, 16px)',
                borderBottom: '1px solid rgba(0,0,0,0.14)',
                margin: '0 calc(-1 * clamp(8px, 1.6vw, 16px))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 1.6vw, 13px)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#99241b',
                }}>
                  {lead.category}
                </span>
                <span style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.16)' }} />
                <span style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8a857a',
                }}>
                  Lead Story
                </span>
              </div>
              <h2 style={{
                margin: 0,
                fontFamily: "'Libre Caslon Text', Georgia, serif",
                fontWeight: 700,
                fontSize: 'clamp(30px, 5.2vw, 58px)',
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
                color: 'inherit',
              }}>
                {lead.headline}
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 16, fontSize: 'clamp(14px, 1.9vw, 17px)' }}>
                <span style={{ fontStyle: 'italic', color: '#5c584f' }}>{lead.source}</span>
                <span
                  className="hl-arrow"
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 700,
                    color: '#99241b',
                  }}
                >
                  Read&nbsp;↗
                </span>
              </div>
            </a>

            {/* Stories 2–5 */}
            {rest.map((story, i) => (
              <a
                key={i}
                className="hl-row"
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: '14px 30px',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: 'clamp(22px, 2.8vw, 30px) clamp(8px, 1.6vw, 16px)',
                  borderBottom: '1px solid rgba(0,0,0,0.14)',
                  margin: '0 calc(-1 * clamp(8px, 1.6vw, 16px))',
                }}
              >
                <div style={{ flex: '1 1 150px', maxWidth: 200 }}>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(11px, 1.5vw, 12.5px)',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#99241b',
                  }}>
                    {story.category}
                  </div>
                  <div style={{ marginTop: 8, fontStyle: 'italic', fontSize: 15, color: '#5c584f' }}>
                    {story.source}
                  </div>
                </div>
                <div style={{ flex: '4 1 360px' }}>
                  <h2 style={{
                    margin: 0,
                    fontFamily: "'Libre Caslon Text', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 'clamp(21px, 2.9vw, 34px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.005em',
                    color: 'inherit',
                  }}>
                    {story.headline}
                  </h2>
                  <span
                    className="hl-arrow"
                    style={{
                      display: 'inline-block',
                      marginTop: 8,
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#99241b',
                    }}
                  >
                    Read&nbsp;↗
                  </span>
                </div>
              </a>
            ))}

          </div>

          {/* Footer */}
          <div style={{
            marginTop: 'clamp(24px, 3.4vw, 40px)',
            paddingTop: 16,
            borderTop: '1px solid #1b1a17',
            textAlign: 'center',
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(10px, 1.4vw, 12px)',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8a857a',
          }}>
            Curated weekly · Five stories, no more
          </div>

        </div>
      </div>
    </>
  );
}
