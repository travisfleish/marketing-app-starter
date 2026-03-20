import { useEffect, useState } from 'react'
import { GeniusStripHoverBg } from '@genius-sports/gs-marketing-ui'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_logo.svg?url'

const FADE_SCROLL_THRESHOLD = 120

/** Matches the fixed header inner bar (`h-*` row); keep in sync with the header container classes below. Header is `hidden` below `sm`. */
export const SITE_HEADER_MAIN_OFFSET_CLASS =
  'max-sm:pt-0 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-24'

export function SiteHeader() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollY / FADE_SCROLL_THRESHOLD)
      setOpacity(newOpacity)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 hidden transition-opacity duration-200 sm:block"
      style={{ opacity, pointerEvents: opacity < 0.01 ? 'none' : 'auto' }}
    >
      <div className="flex h-12 min-h-0 w-full items-center justify-between gap-2 px-4 pt-3 sm:h-14 sm:gap-4 sm:px-6 sm:pt-4 md:h-16 md:px-10 lg:h-20 lg:px-32 lg:pt-5 xl:h-24 xl:px-36 xl:pt-6">
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Genius Sports"
          className="min-w-0 flex-shrink-0"
        >
          <img
            src={geniusLogoUrl}
            alt="Genius Sports"
            className="h-10 w-auto object-contain object-left md:h-12 lg:h-16 xl:h-24"
          />
        </a>
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex max-w-[20.9375rem] flex-shrink-0 items-center"
        >
          <div className="relative cursor-pointer overflow-hidden rounded-pill bg-navy/5">
            <GeniusStripHoverBg />
            <span className="relative z-20 block rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-navy transition-colors duration-300 ease-in-out group-hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
              Visit Genius Sports
            </span>
          </div>
        </a>
      </div>
    </header>
  )
}
