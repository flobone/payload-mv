import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

type EventDoc = {
  id: string | number
  slug?: string | null
  title?: string | null
  overrideTitle?: string | null
  location?: string | null
  overrideLocation?: string | null
  startsAt?: string | null
  isPublished?: boolean | null
  isHidden?: boolean | null
}

type Props = {
  eyebrow?: string | null
  title: string
  text?: string | null
  count?: number | null
  showLocation?: boolean | null
  linkLabel?: string | null
  linkHref?: string | null
  backgroundStyle?: 'light' | 'blue' | 'green' | null
}

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function UpcomingEventsBlock(props: Props) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: {
      and: [
        {
          isPublished: {
            equals: true,
          },
        },
        {
          isHidden: {
            not_equals: true,
          },
        },
        {
          startsAt: {
            greater_than_equal: new Date().toISOString(),
          },
        },
      ],
    },
    sort: 'startsAt',
    limit: props.count ?? 3,
    depth: 1,
  })

  const events = result.docs as EventDoc[]

  const backgroundClass =
    props.backgroundStyle === 'blue'
      ? 'bg-[#5b83ca]/10'
      : props.backgroundStyle === 'green'
        ? 'bg-[#006632]/10'
        : 'bg-white'

  return (
    <section className={`rounded-[2rem] border border-black/10 p-8 shadow-sm ${backgroundClass}`}>
      <div className="max-w-3xl">
        {props.eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff9900]">
            {props.eyebrow}
          </p>
        ) : null}

        <h2 className="text-4xl text-[#323332]">{props.title}</h2>

        {props.text ? (
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#323332]/80">
            {props.text}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4">
        {events.map((event) => {
          const title = event.overrideTitle || event.title || 'Termin'
          const location = event.overrideLocation || event.location || ''
          const href = event.slug ? `/termine/${event.slug}` : props.linkHref || '/termine'

          return (
            <Link
              key={String(event.id)}
              href={href}
              className="flex flex-col gap-2 rounded-[1.25rem] border border-black/10 bg-white px-5 py-4 transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold text-[#ff9900]">
                {formatDate(event.startsAt)}
              </p>
              <h3 className="text-2xl text-[#323332]">{title}</h3>
              {props.showLocation !== false && location ? (
                <p className="text-sm text-[#323332]/75">{location}</p>
              ) : null}
            </Link>
          )
        })}
      </div>

      {props.linkLabel ? (
        <div className="mt-8">
          <Link
            href={props.linkHref || '/termine'}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ff9900] px-5 text-white font-semibold"
          >
            {props.linkLabel}
          </Link>
        </div>
      ) : null}
    </section>
  )
}