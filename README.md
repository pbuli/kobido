# Masaż Kobido Paulina Paszkiewicz — strona

Statyczna strona wizytówka zbudowana w **Vite + Tailwind CSS v4** (pnpm).
Hostowana na **Cloudflare Pages** (auto-deploy po `git push`).

## Wymagania

- Node.js 20+
- pnpm

## Praca lokalna

```bash
pnpm install      # instalacja zależności (raz)
pnpm local        # serwer deweloperski z podglądem na żywo (HMR)
                  # === to samo co: pnpm dev
```

Strona otworzy się sama w przeglądarce (np. http://localhost:5173).
Każda zmiana w `index.html`, `src/style.css` lub plikach w `public/`
jest widoczna od razu, bez przeładowania.

### Podgląd wersji produkcyjnej

```bash
pnpm build        # buduje stronę do katalogu dist/
pnpm preview      # serwuje gotowy build z dist/ (jak na produkcji)
```

## Struktura

```
index.html            ← cała treść strony (sekcje, teksty)
src/style.css         ← style, kolory, czcionka (tokeny w @theme na górze pliku)
src/main.js           ← drobny JS (sticky header, rok w stopce)
public/images/        ← zdjęcia (podmieniaj tutaj, nazwy zostają te same)
```

### Jak edytować

- **Teksty / ceny** — edytuj bezpośrednio w `index.html`.
- **Kolory / czcionka** — sekcja `@theme` na górze `src/style.css`.
- **Zdjęcia** — wrzuć nowy plik do `public/images/` pod tą samą nazwą
  (np. `kobido.jpg`), albo zmień `src="..."` w `index.html`.

## Rezerwacje (Bookero)

Przycisk „Zarezerwuj termin" oraz sekcja „Rezerwacja" kierują do
`https://kobidolublin.bookero.pl/`. Jeśli masz oficjalny kod osadzenia
widgetu Bookero, możesz go wkleić w sekcji `#rezerwacja` w `index.html`
(zamiast przycisku).

## Opinie Google

Sekcja „Opinie" (`#opinie` w `index.html`) zawiera trzy **przykładowe** karty.
Aby pokazać prawdziwe opinie z Twojego profilu Google Business:

1. Wybierz widget opinii Google, np. [Elfsight Google Reviews](https://elfsight.com/google-reviews-widget/)
   (darmowy plan na start) lub podobny.
2. Połącz swój profil Google, skopiuj kod osadzenia (embed).
3. Wklej kod w kontenerze `#google-reviews` w `index.html` i usuń przykładowe karty.

## Cloudflare Pages — wdrożenie

Patrz: **DEPLOY.md**.
