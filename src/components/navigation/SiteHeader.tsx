import { Link, NavLink } from 'react-router-dom'
import { SectionShell, Text } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `font-body text-sm transition-colors md:text-base ${
    isActive ? 'text-navy font-medium' : 'text-muted hover:text-foreground'
  }`

export function SiteHeader() {
  const { brand, header } = siteContent

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-gs-bg/95 backdrop-blur-sm">
      <SectionShell
        width="wide"
        className="flex h-14 items-center justify-between gap-4 md:h-16 lg:h-[4.5rem]"
      >
        <Link to={brand.homePath} className="min-w-0 shrink-0">
          <Text as="span" variant="lead" className="font-heading font-medium text-navy">
            {brand.name}
          </Text>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {header.nav.map((item) => (
            <NavLink
              key={`${item.to}${item.hash ? `#${item.hash}` : ''}-${item.label}`}
              to={item.hash ? { pathname: item.to, hash: item.hash } : item.to}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={header.cta.href}
            {...(header.cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="font-heading text-sm font-medium text-accent hover:text-accent-hover md:text-base"
          >
            {header.cta.label}
          </a>
        </div>
      </SectionShell>
    </header>
  )
}
