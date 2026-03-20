export type NavItem = {
  label: string
  /** Pathname (e.g. `/` or `/about`) */
  to: string
  /** Optional in-page hash without `#` */
  hash?: string
}

export type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

export const siteContent = {
  brand: {
    name: 'Your Company',
    homePath: '/' as const,
  },
  header: {
    nav: [
      { label: 'Overview', to: '/' },
      { label: 'Solutions', to: '/', hash: 'solutions' },
    ] satisfies NavItem[],
    cta: {
      label: 'Get started',
      href: 'https://example.com',
      external: true as const,
    },
  },
  footer: {
    tagline: 'Placeholder marketing footer — swap links and copy for your launch.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Overview', href: '/#' },
          { label: 'Pricing', href: '/#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/#' },
          { label: 'Careers', href: '/#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/#' },
          { label: 'Terms', href: '/#' },
        ],
      },
    ] satisfies FooterColumn[],
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  },
  home: {
    meta: {
      title: 'Home · Your Company',
      description:
        'Starter layout for single-page marketing sites built with the shared @genius-sports/gs-marketing-ui package.',
    },
    hero: {
      eyebrow: 'Marketing starter',
      title: 'Launch campaign pages with a consistent shell',
      description:
        'This page composes shared primitives—layout, typography, buttons, and cards—with small local helpers for heroes and section intros. Replace copy and routes for your next site.',
    },
    intro: {
      eyebrow: 'Pattern',
      title: 'Compose, do not fork the design system',
      description:
        'Keep tokens, Tailwind preset, and UI primitives in the shared package. This app only wires routing, SEO helpers, and reusable section shells.',
      align: 'center' as const,
    },
    featureCards: {
      eyebrow: 'Building blocks',
      title: 'Three placeholder pillars',
      description: 'Swap these cards for product-specific value props on a real campaign.',
      items: [
        {
          title: 'Fast setup',
          body: 'Clone the starter, point at the published UI package, and start composing sections.',
        },
        {
          title: 'Shared look and feel',
          body: 'Typography, color, and motion stay aligned because they live in one dependency.',
        },
        {
          title: 'Room to grow',
          body: 'Add providers, analytics, or CMS data in app code without touching the package.',
        },
      ],
    },
  },
}
