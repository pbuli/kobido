# Wdrożenie na Cloudflare Pages

Strona to czysty build statyczny (HTML/CSS/JS w `dist/`). Cloudflare buduje ją
sam po każdym `git push`.

## 1. Wrzuć repozytorium na GitHub

```bash
git add -A
git commit -m "Strona Kobido — wersja Vite + Tailwind"
git push
```

> Ważne: w repo musi znaleźć się **`pnpm-lock.yaml`** (już jest) — po nim
> Cloudflare rozpoznaje, że ma użyć `pnpm`.

## 2. Połącz repo w panelu Cloudflare

Cloudflare Dashboard → **Workers & Pages** → **Create** → zakładka **Pages** →
**Connect to Git** → wybierz to repozytorium.

## 3. Ustawienia builda

Projekt działa jako **Worker ze statycznymi plikami** (Static Assets).
W repo jest plik **`wrangler.jsonc`**, który mówi Wranglerowi, żeby tylko wysłał
zawartość `dist/` (bez auto-konfiguracji i bez ponownego builda).

| Pole | Wartość |
|------|---------|
| **Build command** | `pnpm run build` |
| **Deploy command** | `npx wrangler deploy` |

### Dwie komendy, o które pyta Cloudflare

- **Build command:**
  ```
  pnpm run build
  ```
  (Cloudflare sam uruchomi `pnpm install` przed buildem, bo widzi `pnpm-lock.yaml`.)

- **Deploy command:**
  ```
  npx wrangler deploy
  ```
  Dzięki plikowi `wrangler.jsonc` Wrangler wyśle gotowe pliki z `dist/`.

### Dlaczego poprzednie próby nie działały

- `npx wrangler pages deploy dist ...` → **Authentication error [code: 10000]** —
  token CI ma uprawnienia do Workers, ale nie do *Pages*. (Ten projekt to Worker,
  więc i tak nie używamy `pages deploy`.)
- gołe `npx wrangler deploy` bez `wrangler.jsonc` → Wrangler robił auto-konfigurację,
  dokładał `@cloudflare/vite-plugin` i build wywalał się na `registerHooks`
  (niezgodność wersji Node). Plik `wrangler.jsonc` to wyłącza.

## 4. Wersja Node

W repo jest plik **`.nvmrc`** (`20`), więc Cloudflare użyje Node 20.
Alternatywnie można ustawić zmienną środowiskową `NODE_VERSION = 20`
w Settings → Environment variables.

## 5. Domena

Po pierwszym wdrożeniu projekt dostanie adres `*.pages.dev`.
Własną domenę (`kobidolublin.pl`) podłączysz w:
Pages → projekt → **Custom domains** → **Set up a custom domain**.

## Ręczne wdrożenie (opcjonalnie, bez Git)

```bash
pnpm build
npx wrangler pages deploy dist --project-name=kobido-lublin
```
