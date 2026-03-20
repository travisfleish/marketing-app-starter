import { Link } from 'react-router-dom'
import { SectionShell, Text } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'

export function SiteFooter() {
  const { brand, footer } = siteContent

  return (
    <footer className="mt-auto border-t border-border bg-gs-surface/60 py-12 md:py-16">
      <SectionShell width="wide" className="flex flex-col gap-10 md:gap-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to={brand.homePath}>
              <Text as="span" variant="lead" className="font-heading font-medium text-navy">
                {brand.name}
              </Text>
            </Link>
            <Text variant="muted" className="mt-3 max-w-xs">
              {footer.tagline}
            </Text>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <Text as="span" variant="bodySm" className="font-heading font-medium text-navy">
                {col.title}
              </Text>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Text variant="bodySm" className="border-t border-border pt-8 text-muted">
          {footer.copyright}
        </Text>
      </SectionShell>
    </footer>
  )
}
