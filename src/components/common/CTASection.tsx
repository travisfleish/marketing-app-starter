import type { ReactNode } from 'react'
import { Card, Heading, SectionShell, Text } from '@genius-sports/gs-marketing-ui'

export type CTASectionProps = {
  id?: string
  title: string
  description?: string
  actions?: ReactNode
}

export function CTASection({ id, title, description, actions }: CTASectionProps) {
  return (
    <section id={id} className="py-16 md:py-20">
      <SectionShell width="default">
        <Card variant="feature" className="bg-navy p-8 text-white md:p-12">
          <Heading level="h2" className="!text-white">
            {title}
          </Heading>
          {description ? (
            <Text variant="lead" className="mt-4 !text-white/90">
              {description}
            </Text>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </Card>
      </SectionShell>
    </section>
  )
}
