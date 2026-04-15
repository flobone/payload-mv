import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.css'

const upcomingEvents = [
  { title: 'Frühlingskonzert', date: '20. März 2027', location: 'Hilchenbach', href: '/termine' },
  { title: 'Maibaum Aufstellen', date: '30. April 2026', location: 'Müsen', href: '/termine' },
  { title: 'Frühschoppen zum 1. Mai', date: '1. Mai 2026', location: 'Müsen', href: '/termine' },
]

const quickLinks = [
  {
    title: 'Aktuelles',
    text: 'Neuigkeiten, Berichte und Rückblicke aus dem Vereinsleben.',
    href: '/posts',
  },
  {
    title: 'Termine',
    text: 'Kommende Veranstaltungen, Konzerte und Auftritte auf einen Blick.',
    href: '/termine',
  },
  {
    title: 'Verein',
    text: 'Mehr über Geschichte, Gemeinschaft und musikalische Arbeit erfahren.',
    href: '/verein/chronik',
  },
]

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackdropBlue} />
        <div className={styles.heroBackdropGreen} />
        <div className={styles.heroSun} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Musikverein Müsen 1919 e.V.</p>
              <h1 className={styles.heroTitle}>Musik, Gemeinschaft und Heimatgefühl.</h1>
              <p className={styles.heroText}>
                Der Musikverein Müsen verbindet musikalische Tradition mit einem lebendigen
                Vereinsleben. Konzerte, Feste, Jugendarbeit und gemeinsame Erlebnisse prägen
                unser Jahr ebenso wie die Freude an guter Blasmusik.
              </p>

              <div className={styles.heroActions}>
                <Link href="/termine" className={styles.primaryButton}>
                  Zu den Terminen
                </Link>
                <Link href="/verein/chronik" className={styles.secondaryButton}>
                  Vereinschronik
                </Link>
              </div>
            </div>

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
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>Schnelleinstieg</p>
            <h2 className={styles.sectionTitle}>Willkommen beim Musikverein Müsen</h2>
            <p className={styles.sectionText}>
              Die neue Website soll schnell zu den wichtigsten Informationen führen und zugleich
              den Charakter des Vereins transportieren: offen, bodenständig, musikalisch und freundlich.
            </p>
          </div>

          <div className={styles.quickGrid}>
            {quickLinks.map((item) => (
              <Link key={item.title} href={item.href} className={styles.quickCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
                <span className={styles.cardLink}>Mehr erfahren</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <p className={styles.sectionEyebrow}>Nächste Veranstaltungen</p>
              <h2 className={styles.sectionTitle}>Musik erleben</h2>
              <p className={styles.sectionText}>
                Die wichtigsten kommenden Termine können hier prominent platziert werden. Später
                kann dieser Bereich direkt aus Payload-Events oder dem synchronisierten Kalender
                gespeist werden.
              </p>
            </div>

            <div className={styles.eventList}>
              {upcomingEvents.map((event) => (
                <Link key={event.title} href={event.href} className={styles.eventCard}>
                  <div>
                    <p className={styles.eventDate}>{event.date}</p>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                  </div>
                  <p className={styles.eventLocation}>{event.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.featureBand}>
            <div className={styles.featureBlock}>
              <p className={styles.sectionEyebrow}>Verein</p>
              <h2 className={styles.sectionTitle}>Seit 1919 im Ort verwurzelt</h2>
              <p className={styles.sectionText}>
                Geschichte, Gemeinschaft und musikalische Qualität gehören beim Musikverein Müsen
                zusammen. Die Chronik, das aktive Vereinsleben und die Verbundenheit mit dem Ort
                sollen auf der Startseite sichtbar werden.
              </p>
            </div>

            <div className={styles.featureBlock}>
              <p className={styles.sectionEyebrow}>Jugendarbeit</p>
              <h2 className={styles.sectionTitle}>Nachwuchs mit Perspektive</h2>
              <p className={styles.sectionText}>
                Kinder und Jugendliche früh an Musik, Ensemble-Spiel und Gemeinschaft heranzuführen,
                ist ein wesentlicher Teil der Vereinsarbeit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}