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

| Pole | Wartość |
|------|---------|
| Framework preset | **None** (lub „Vite") |
| **Build command** | `pnpm run build` |
| **Build output directory** | `dist` |
| **Deploy command** | *(zostaw puste)* |
| Production branch | `main` |

### Dwie komendy, o które pyta Cloudflare

- **Build command:**
  ```
  pnpm run build
  ```
  (Cloudflare sam uruchomi `pnpm install` przed buildem, bo widzi `pnpm-lock.yaml`.
  Jeśli kiedyś instalacja zostanie pominięta, użyj: `pnpm install && pnpm run build`.)

- **Deploy command:**
  Przy integracji z Git **nie jest potrzebna** — zostaw to pole puste.
  Cloudflare automatycznie publikuje zawartość katalogu `dist/` po każdym
  buildzie (czyli po każdym `git push`).

  Jeśli interfejs wymusza wpisanie czegoś (nowy tryb „Workers Builds"),
  wpisz:
  ```
  npx wrangler pages deploy dist --project-name=kobido-lublin
  ```
  (`kobido-lublin` zamień na nazwę projektu nadaną w Cloudflare.)

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
