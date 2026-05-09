# Raport z testow - Quiz motoryzacyjny

**Autor:** Bartlomiej Kulej  
**Data:** 2026-05-09  
**Wersja aplikacji:** v0.0.0  
**Repozytorium:** https://github.com/ToZaTamto/Programowanie-stron-internetowych-2-/tree/main/quiz

## 1. Wstep

Testowana aplikacja to quiz motoryzacyjny napisany w Vue 3. Uzytkownik rozpoczyna quiz, odpowiada na 5 pytan jednokrotnego wyboru, a na koncu otrzymuje wynik procentowy i komunikat podsumowujacy. Aplikacja pozwala tez przelaczac motyw jasny/ciemny i zapisuje wybor w `localStorage`.

## 2. Zakres testow

Testami objete zostaly:

- renderowanie ekranu startowego na podstawie propsow,
- emit zdarzenia `start`,
- renderowanie pytania, odpowiedzi i paska postepu,
- emit odpowiedzi poprawnej i blednej,
- blokada ponownego odpowiadania,
- emit zdarzenia `next`,
- reset stanu pytania po zmianie propsa,
- obliczanie procentu i komunikatu wyniku,
- emit zdarzenia `restart`,
- glowny przeplyw aplikacji: start, przejscie przez quiz, wynik, restart,
- zmiana motywu i zapis/odczyt z `localStorage`.

Swiadomie pominieto testy styli CSS oraz szczegolowe testy wygladu, poniewaz nie sa kluczowa logika aplikacji i bylyby kruche przy zmianach wizualnych.

## 3. Srodowisko testowe

- System: Windows
- Node.js: v20.15.1
- npm: 10.7.0
- Vue: ^3.5.13
- Vite: ^6.2.0
- Vitest: ^3.2.4
- Vue Test Utils: ^2.4.6
- jsdom: ^25.0.1
- Coverage: @vitest/coverage-v8 ^3.2.4

## 4. Strategia testowania

Strategia opiera sie na piramidzie testow. Najwiecej testow dotyczy komponentow i ich logiki: propsow, computed, emitow oraz reakcji na klikniecia uzytkownika. Dodatkowo dodano kilka testow integracyjnych dla `App.vue`, bo to tam lacza sie ekrany quizu i liczony jest wynik koncowy. Testy E2E nie byly konieczne dla tego etapu zadania.

## 5. Lista przypadkow testowych

| ID | Opis | Oczekiwany wynik | Status |
|---|---|---|---|
| TC-01 | Render ekranu startowego z propsami | Widoczny tytul i opis | OK |
| TC-02 | Klikniecie "Rozpocznij quiz" | Emit `start` | OK |
| TC-03 | Render pytania | Widoczna tresc, odpowiedzi i postep | OK |
| TC-04 | Wybor poprawnej odpowiedzi | Emit `answered=true`, klasa `correct` | OK |
| TC-05 | Wybor blednej odpowiedzi | Emit `answered=false`, klasy `wrong` i `correct` | OK |
| TC-06 | Druga proba odpowiedzi | Brak kolejnego emitu, przyciski zablokowane | OK |
| TC-07 | Klikniecie dalej po odpowiedzi | Emit `next` | OK |
| TC-08 | Zmiana pytania | Reset wybranej odpowiedzi | OK |
| TC-09 | Render wyniku 4/5 | Widoczne `80%` | OK |
| TC-10 | Komunikaty dla progow wyniku | Poprawny komunikat dla 100%, 80%, 60% i niskiego wyniku | OK |
| TC-11 | Klikniecie "Zagraj ponownie" | Emit `restart` | OK |
| TC-12 | Glowny przeplyw quizu | Po 5 pytaniach widoczny wynik `5 / 5` i `100%` | OK |
| TC-13 | Restart po wyniku | Powrot do ekranu startowego | OK |
| TC-14 | Przelaczenie motywu | Klasa `theme-light`, zapis `quiz-theme=light` | OK |
| TC-15 | Odczyt zapisanego motywu | Aplikacja startuje w jasnym motywie | OK |

## 6. Wyniki ilosciowe

- Liczba plikow testowych: **4**
- Liczba testow: **19**
- Przeszlo: **19** (100%)
- Nie przeszlo: **0**
- Pominiętych: **0**
- Czas wykonania `npm run test:run`: ok. **1.19s**

## 7. Pokrycie kodu

Wynik z komendy `npm run test:coverage`:

| Metryka | Wynik |
|---|---:|
| Statements | 99.02% |
| Branches | 93.61% |
| Functions | 100% |
| Lines | 99.02% |

<img width="1919" height="349" alt="image" src="https://github.com/user-attachments/assets/0f28ae50-8e59-4f8f-9879-e7ba28b0efe8" />


## 8. Zaobserwowane problemy

| ID | Problem | Severity | Status |
|---|---|---|---|
| BUG-1 | Czesc polskich znakow i emoji w tekstach aplikacji wyglada na uszkodzone kodowanie znakow | low | otwarte |

Nie znaleziono problemow blokujacych dzialanie quizu.

## 9. Wnioski i rekomendacje

Aplikacja ma pokryte najwazniejsze zachowania: rozpoczecie quizu, wybor odpowiedzi, naliczanie punktow, przejscie do wyniku, restart oraz obsluge motywu. Pokrycie linii wynosi 99.02%, czyli przekracza wymagane 70%.

Rekomendacje:

- poprawic kodowanie polskich znakow w tekstach UI,
- przy rozbudowie quizu dodac testy dla nowych typow pytan lub walidacji danych.

## 10. Zalaczniki

- Testy: `src/App.spec.js`, `src/components/EkranStart.spec.js`, `src/components/EkranPytanie.spec.js`, `src/components/EkranWynik.spec.js`
- Konfiguracja: `vite.config.js`, `package.json`
- Raport coverage HTML: `coverage/index.html`
- Link do repozytorium: https://github.com/ToZaTamto/Programowanie-stron-internetowych-2-/tree/main/quiz
