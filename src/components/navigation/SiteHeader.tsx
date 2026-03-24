import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GeniusStripHoverBg } from '@genius-sports/gs-marketing-ui'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_logo.svg?url'
import { siteContent } from '../../content/site'

const SCROLLED_HEADER_THRESHOLD = 60

/** Matches the fixed header inner bar (`h-*` row); keep in sync with the header container classes below. */
export const SITE_HEADER_MAIN_OFFSET_CLASS = 'pt-20'

type DropdownSection = {
  label: string
  href?: string
  description?: string
  children?: {
    label: string
    href: string
    description?: string
  }[]
}

function SectionHeader({
  label,
  href,
  onClick,
  labelClassName,
  showIcon = true,
}: {
  label: string
  href?: string
  onClick?: () => void
  labelClassName?: string
  showIcon?: boolean
}) {
  const content = (
    <>
      <span className={labelClassName ?? 'header-nav-link-font'}>{label}</span>
      {showIcon ? (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[0.65rem] leading-none">
          ↗
        </span>
      ) : null}
    </>
  )

  if (!href) {
    return (
      <div className={showIcon ? 'inline-flex items-center gap-2 text-navy' : 'inline-flex text-navy'}>
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        showIcon
          ? 'inline-flex items-center gap-2 text-navy transition-colors hover:text-navy/75'
          : 'inline-flex text-navy transition-colors hover:text-navy/75'
      }
      onClick={onClick}
    >
      {content}
    </a>
  )
}

function ProductsDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  const perform = children.find((section) => section.label === 'Perform')
  const bet = children.find((section) => section.label === 'Bet')
  const engage = children.find((section) => section.label === 'Engage')
  const leftColumn = [perform, bet].filter(Boolean) as DropdownSection[]
  const rightColumn = [engage].filter(Boolean) as DropdownSection[]

  const renderSectionGroup = (section: DropdownSection, addBottomMargin: boolean) => (
    <div key={section.label} className={addBottomMargin ? 'mb-6' : ''}>
      <SectionHeader
        label={section.label}
        href={section.href}
        onClick={onLinkClick}
        labelClassName="header-dropdown-section-title-font"
        showIcon={false}
      />
      {section.children?.length ? (
        <ul className="mt-2 flex flex-col space-y-2 text-left">
          {section.children.map((subLink) => (
            <li key={subLink.label} className="w-full text-left">
              <a
                href={subLink.href}
                target="_blank"
                rel="noreferrer"
                className="header-nav-link-font block w-full text-left text-navy/75 transition-colors hover:text-navy"
                onClick={onLinkClick}
              >
                {subLink.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  return (
    <div className="flex flex-row items-start gap-x-24">
      <div className="flex flex-col items-start text-left">
        {leftColumn.map((section, index) => renderSectionGroup(section, index < leftColumn.length - 1))}
      </div>
      <div className="flex flex-col items-start text-left">
        {rightColumn.map((section, index) => renderSectionGroup(section, index < rightColumn.length - 1))}
      </div>
    </div>
  )
}

function SolutionsDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-x-16 gap-y-8">
      {children.map((section) => (
        <div key={section.label} className="flex flex-col items-start text-left">
          <SectionHeader
            label={section.label}
            href={section.href}
            onClick={onLinkClick}
            labelClassName="header-dropdown-section-title-font"
            showIcon={false}
          />
          {section.description ? (
            <p className="mt-3 text-base font-normal leading-relaxed text-navy/75">{section.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function LearnDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-x-16">
      {children.map((section) => (
        <div key={section.label} className="flex flex-col items-start text-left">
          <SectionHeader
            label={section.label}
            href={section.href}
            onClick={onLinkClick}
            labelClassName="header-dropdown-section-title-font"
            showIcon={false}
          />
          {section.description ? (
            <p className="mt-3 text-base font-normal leading-relaxed text-navy/75">{section.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMobileSections, setExpandedMobileSections] = useState<Record<string, boolean>>({})
  const navItems = siteContent.header.nav
  const activeDropdownItem = navItems.find((item) => item.label === openDesktopDropdown && item.children?.length)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLLED_HEADER_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      setExpandedMobileSections({})
    } else {
      setOpenDesktopDropdown(null)
    }
  }, [mobileMenuOpen])

  const toggleMobileSection = (label: string) => {
    setExpandedMobileSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md'
          : 'bg-white backdrop-blur-0'
      }`}
    >
      <div className="relative" onMouseLeave={() => setOpenDesktopDropdown(null)}>
        <div className="container mx-auto flex h-full items-center gap-4 py-2">
          <a
            href="https://www.geniussports.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Genius Sports"
            className="min-w-0 flex-shrink-0"
          >
            <img src={geniusLogoUrl} alt="Genius Sports" className="h-24 w-auto object-contain object-left" />
          </a>

          <nav className="hidden items-center gap-8 md:ml-4 md:flex lg:gap-11">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const isOpen = openDesktopDropdown === item.label
              const itemHref = item.href ?? '#'

              return (
                <div key={item.label} className="relative" onMouseEnter={() => hasChildren && setOpenDesktopDropdown(item.label)}>
                  {hasChildren ? (
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 border-b-2 py-1.5 text-navy transition-colors ${
                        isOpen ? '-mb-px border-blue-600' : 'border-transparent'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="header-nav-link-font">{item.label}</span>
                    </button>
                  ) : (
                    <a
                      href={itemHref}
                      target="_blank"
                      rel="noreferrer"
                      className="header-nav-link-font inline-flex items-center py-1.5 text-navy transition-colors hover:text-navy/70"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              )
            })}
          </nav>

          <a
            href="https://www.geniussports.com"
            target="_blank"
            rel="noreferrer"
            className="group ml-auto hidden max-w-[20.9375rem] flex-shrink-0 items-center md:inline-flex"
          >
            <div className="relative cursor-pointer overflow-hidden rounded-pill bg-navy/5">
              <GeniusStripHoverBg />
              <span className="relative z-20 block rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-navy transition-colors duration-300 ease-in-out group-hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
                Visit Genius Sports
              </span>
            </div>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center text-navy md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">✕</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-6 rounded bg-navy" />
                <span className="block h-0.5 w-6 rounded bg-navy" />
                <span className="block h-0.5 w-6 rounded bg-navy" />
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {activeDropdownItem ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full z-30 bg-white shadow-[0_14px_28px_rgba(7,11,21,0.12)]"
            >
              <div className="container mx-auto py-8 lg:py-12">
                {activeDropdownItem.label === 'Products' ? (
                  <ProductsDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
                {activeDropdownItem.label === 'Solutions' ? (
                  <SolutionsDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
                {activeDropdownItem.label === 'Learn' ? (
                  <LearnDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-white md:hidden"
          >
            <div className="px-4 pb-10 pt-6 sm:px-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length)
                  const isExpanded = Boolean(expandedMobileSections[item.label])
                  const itemHref = item.href ?? '#'

                  if (!hasChildren) {
                    return (
                      <a
                        key={item.label}
                        href={itemHref}
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav-link-font block rounded-md px-3 py-3 text-navy transition-colors hover:bg-navy/5"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    )
                  }

                  return (
                    <div key={item.label} className="rounded-md">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-navy transition-colors hover:bg-navy/5"
                        onClick={() => toggleMobileSection(item.label)}
                        aria-expanded={isExpanded}
                      >
                        <span className="header-nav-link-font">{item.label}</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 12 12"
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mb-1 mt-1 space-y-4 pl-6 pr-3">
                              {item.children?.map((child) => {
                                if (child.children?.length) {
                                  return (
                                    <div key={child.label}>
                                      <a
                                        href={child.href ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-navy transition-colors hover:text-navy/75"
                                        onClick={closeMobileMenu}
                                      >
                                        <span className="header-nav-link-font">{child.label}</span>
                                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[0.6rem] leading-none">
                                          ↗
                                        </span>
                                      </a>
                                      <div className="mt-2 space-y-2">
                                        {child.children.map((subChild) => (
                                          <a
                                            key={subChild.label}
                                            href={subChild.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="header-nav-link-font block text-navy/75 transition-colors hover:text-navy"
                                            onClick={closeMobileMenu}
                                          >
                                            {subChild.label}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                }

                                return (
                                  <a
                                    key={child.label}
                                    href={child.href ?? '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-md py-1 text-navy transition-colors hover:text-navy/75"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      <span className="header-nav-link-font">{child.label}</span>
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[0.6rem] leading-none">
                                        ↗
                                      </span>
                                    </span>
                                    {child.description ? (
                                      <span className="mt-1 block font-normal leading-relaxed text-navy/75">
                                        {child.description}
                                      </span>
                                    ) : null}
                                  </a>
                                )
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
