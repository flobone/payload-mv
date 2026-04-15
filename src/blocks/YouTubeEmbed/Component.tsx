import React from 'react'

type Props = {
  eyebrow?: string | null
  title?: string | null
  text?: string | null
  youtubeUrl: string
  caption?: string | null
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '') || null
    }

    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v')
      if (v) return v

      const parts = parsed.pathname.split('/')
      const embedIndex = parts.findIndex((part) => part === 'embed')
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1]
      }
    }

    return null
  } catch {
    return null
  }
}

export const YouTubeEmbedBlock: React.FC<Props> = ({
  eyebrow,
  title,
  text,
  youtubeUrl,
  caption,
}) => {
  const videoId = extractYouTubeId(youtubeUrl)

  if (!videoId) {
    return null
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`

  return (
    <section className="my-16">
      <div className="mx-auto w-full max-w-5xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff9900]">
            {eyebrow}
          </p>
        ) : null}

        {title ? (
          <h2 className="text-4xl text-[#323332]">{title}</h2>
        ) : null}

        {text ? (
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#323332]/80">
            {text}
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title={title || 'YouTube Video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {caption ? (
          <p className="mt-3 text-sm text-[#323332]/65">{caption}</p>
        ) : null}
      </div>
    </section>
  )
}