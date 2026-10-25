# Meridian Immigration Group — website

Next.js 16 + next-intl site for MeridianImmigrationGroup.com. Mission: a frightened grandmother on an old Android phone,
reading Haitian Creole, reaches a lawyer in two taps.

Start with **PLAN.md** (architecture and phases), **CLAUDE.md** (standing rules), **DECISIONS.md**, **TODO.md** (facts the
firm must supply), and **SECURITY.md**.

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm test && pnpm build
pnpm e2e                 # Playwright + axe (builds must exist; starts `pnpm start` on :3100)
pnpm screenshots 1       # with `pnpm start -p 3100` running
```

Edit firm facts in `src/config/site.ts`. Edit words in `messages/{locale}.json`; English is the source.
To add a language, add an entry to `src/i18n/locales.ts` and `messages/{code}.json`, and import it in `src/i18n/catalog.ts`.

Deploy on Vercel with **Root Directory = `meridian`**.
