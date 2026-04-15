import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import styles from './page.module.css'

type RichTextLike = unknown

function extractPlainText(value: RichTextLike): string {
  if (!value || typeof value !== 'object') return ''

  const root = (value as { root?: { children?: unknown[] } }).root
  if (!root?.children || !Array.isArray(root.children)) return ''

  const parts: string[] = []

  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return

    const text = (node as { text?: unknown }).text
    if (typeof text === 'string' && text.trim()) {
      parts.push(text.trim())
    }

    const children = (node as { children?: unknown[] }).children
    if (Array.isArray(children)) {
      children.forEach(walk)
    }
  }

  root.children.forEach(walk)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function formatEventDate(value: string | null | undefined): string {
  if (!value) return ''
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homepage, eventsResult, postsResult] = await Promise.all([
    payload.findGlobal({
      slug: 'homepage',
      depth: 2,
    }),
    payload.find({
      collection: 'events',
      where: {
        and: [
          { isPublished: { equals: true } },
          { isHidden: { not_equals: true } },
        ],
      },
      sort: 'startsAt',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    }),
  ])

  const nextEvent = eventsResult.docs[0] as
    | {
        id: string | number
        slug?: string | null
        title?: string | null
        overrideTitle?: string | null
        location?: string | null
        overrideLocation?: string | null
        startsAt?: string | null
      }
    | undefined

  const upcomingEvents = eventsResult.docs as Array<{
    id: string | number
    slug?: string | null
    title?: string | null
    overrideTitle?: string | null
    location?: string | null
    overrideLocation?: string | null
    startsAt?: string | null
  }>

  const posts = postsResult.docs as Array<{
    id: string | number
    slug?: string | null
    title?: string | null
    excerpt?: string | null
    publishedAt?: string | null
  }>

  const hero = homepage?.hero ?? {}
  const featuredEvent = homepage?.featuredEvent ?? {}
  const aboutSection = homepage?.aboutSection ?? {}
  const youthSection = homepage?.youthSection ?? {}
  const contactSection = homepage?.contactSection ?? {}

  const featuredTitle =
    featuredEvent.mode === 'manual'
      ? featuredEvent.manualTitle
      : nextEvent?.overrideTitle || nextEvent?.title

  const featuredDate =
    featuredEvent.mode === 'manual'
      ? featuredEvent.manualDateText
      : formatEventDate(nextEvent?.startsAt)

  const featuredLocation =
    featuredEvent.mode === 'manual'
      ? featuredEvent.manualLocation
      : nextEvent?.overrideLocation || nextEvent?.location

  const featuredLink =
    featuredEvent.mode === 'manual'
      ? featuredEvent.manualLink || '/termine'
      : nextEvent?.slug
        ? `/termine/${nextEvent.slug}`
        : '/termine'

  const aboutText = extractPlainText(aboutSection.text)
  const youthText = extractPlainText(youthSection.text)

  const aboutImage = aboutSection.image as
    | {
        url?: string | null
        alt?: string | null
      }
    | undefined

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackdropBlue} />
        <div className={styles.heroBackdropGreen} />
        <div className={styles.heroSun} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>
                {hero.eyebrow || 'Musikverein Müsen 1919 e.V.'}
              </p>

              <h1 className={styles.heroTitle}>
                {hero.headline || 'Musik, Gemeinschaft und Heimatgefühl.'}
              </h1>

              <p className={styles.heroText}>
                {hero.text ||
                  'Der Musikverein Müsen verbindet musikalische Tradition mit einem lebendigen Vereinsleben. Konzerte, Feste, Jugendarbeit und gemeinsame Erlebnisse prägen unser Jahr ebenso wie die Freude an guter Blasmusik.'}
              </p>

              <div className={styles.heroActions}>
                <Link
                  href={hero.primaryButtonLink || '/termine'}
                  className={styles.primaryButton}
                >
                  {hero.primaryButtonLabel || 'Zu den Terminen'}
                </Link>

                <Link
                  href={hero.secondaryButtonLink || '/verein/chronik'}
                  className={styles.secondaryButton}
                >
                  {hero.secondaryButtonLabel || 'Vereinschronik'}
                </Link>
              </div>
            </div>

            {hero.showLogo !== false ? (
              <div className={styles.logoCard}>
                <div className={styles.logoWrap}>
                  <Image
                    src="/branding/mv-logo.png"
                    alt="Logo des Musikverein Müsen"
                    width={900}
                    height={392}
                    priority
                    className={styles.logo}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.featuredEventSection}>
        <div className={styles.container}>
          <div className={styles.featuredEventCard}>
            <div>
              <p className={styles.sectionEyebrow}>
                {featuredEvent.sectionTitle || 'Nächste Veranstaltung'}
              </p>
              <h2 className={styles.featuredEventTitle}>
                {featuredTitle || 'Noch kein Termin hinterlegt'}
              </h2>
            </div>

            <div className={styles.featuredMeta}>
              {featuredDate ? <p className={styles.featuredMetaLine}>{featuredDate}</p> : null}
              {featuredLocation ? (
                <p className={styles.featuredMetaLine}>{featuredLocation}</p>
              ) : null}
            </div>

            <div>
              <Link href={featuredLink} className={styles.primaryButton}>
                Zum Termin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutMedia}>
              {aboutImage?.url ? (
                <Image
                  src={aboutImage.url}
                  alt={aboutImage.alt || aboutSection.title || 'Musikverein Müsen'}
                  width={1000}
                  height={700}
                  className={styles.aboutImage}
                />
              ) : (
                <div className={styles.aboutPlaceholder}>Musikverein Müsen</div>
              )}
            </div>

            <div className={styles.aboutContent}>
              <p className={styles.sectionEyebrow}>Verein</p>
              <h2 className={styles.sectionTitle}>
                {aboutSection.title || 'Wer wir sind'}
              </h2>
              <p className={styles.sectionText}>
                {aboutText ||
                  'Der Musikverein Müsen steht für musikalische Tradition, Gemeinschaft und kulturelles Leben im Ort. Generationenübergreifend gestalten wir Konzerte, Feste und Vereinsleben gemeinsam.'}
              </p>
              <Link
                href={aboutSection.linkHref || '/ueber-uns'}
                className={styles.secondaryButton}
              >
                {aboutSection.linkLabel || 'Mehr über den Verein'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div>
              <p className={styles.sectionEyebrow}>Aktuelles</p>
              <h2 className={styles.sectionTitle}>Neuigkeiten aus dem Vereinsleben</h2>
              <div className={styles.newsList}>
                {posts.map((post) => (
                  <Link
                    key={String(post.id)}
                    href={post.slug ? `/posts/${post.slug}` : '/posts'}
                    className={styles.newsCard}
                  >
                    <h3 className={styles.cardTitle}>{post.title || 'Beitrag'}</h3>
                    {post.excerpt ? <p className={styles.cardText}>{post.excerpt}</p> : null}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.sectionEyebrow}>Termine</p>
              <h2 className={styles.sectionTitle}>Kommende Auftritte</h2>
              <div className={styles.eventList}>
                {upcomingEvents.map((event) => (
                  <Link
                    key={String(event.id)}
                    href={event.slug ? `/termine/${event.slug}` : '/termine'}
                    className={styles.eventCard}
                  >
                    <div>
                      <p className={styles.eventDate}>{formatEventDate(event.startsAt)}</p>
                      <h3 className={styles.eventTitle}>
                        {event.overrideTitle || event.title || 'Termin'}
                      </h3>
                    </div>
                    <p className={styles.eventLocation}>
                      {event.overrideLocation || event.location || ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.featureBand}>
            <div className={styles.featureBlock}>
              <p className={styles.sectionEyebrow}>Jugendarbeit</p>
              <h2 className={styles.sectionTitle}>
                {youthSection.title || 'Nachwuchs mit Perspektive'}
              </h2>
              <p className={styles.sectionText}>
                {youthText ||
                  'Kinder und Jugendliche früh an Musik, Ensemble-Spiel und Gemeinschaft heranzuführen, ist ein wesentlicher Teil der Vereinsarbeit.'}
              </p>
              <Link
                href={youthSection.linkHref || '/jugendarbeit'}
                className={styles.secondaryButton}
              >
                {youthSection.linkLabel || 'Mehr zur Jugendarbeit'}
              </Link>
            </div>

            <div className={styles.featureBlock}>
              <p className={styles.sectionEyebrow}>Kontakt</p>
              <h2 className={styles.sectionTitle}>
                {contactSection.title || 'Kontakt und Mitmachen'}
              </h2>
              <p className={styles.sectionText}>
                {contactSection.text ||
                  'Sie möchten den Verein anfragen, uns unterstützen oder selbst mitmachen? Wir freuen uns über jede Nachricht.'}
              </p>
              <Link
                href={contactSection.linkHref || '/kontakt'}
                className={styles.primaryButton}
              >
                {contactSection.linkLabel || 'Kontakt aufnehmen'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}