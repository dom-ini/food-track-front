# Food Track

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pl](https://img.shields.io/badge/lang-pl-white.svg)](README.pl.md)

## Opis projektu

Food Track to internetowy dziennik żywieniowy. Funkcjonalności obejmują:

- dodawanie zjedzonych produktów w wybranym dniu i w ramach wybranego posiłku,
- dodawanie nowych produktów do bazy danych (wymaga to każdorazowego zatwierdzenia przez administatora),
- automatyczne zliczanie zjedzonych kalorii oraz makroskładników (zarówno dla całego dnia, jak i w ramach każdego posiłku),
- ustawianie dziennych celów obejmujących kalorie oraz makroskładniki.

## Linki

### Repozytorium API

https://github.com/dom-ini/food-track-api/

## Stack technologiczny

### Front-end

- React 18
- Bootstrap 5

## Uruchamianie projektu

Najpierw należy uruchomić API z repozytorium API. Możesz zalogować się do konsoli administratora i dodać kilka przykładowych produktów.

W katalogu projektu utwórz plik _.env_ i dodaj wymagane wartości (możesz zobaczyć plik _.env.example_ w celach informacyjnych).

Uruchom `npm i`, aby zainstalować zależności i `npm run start`, aby uruchomić serwer deweloperski.

Otwórz stronę http://localhost:3000/ w przeglądarce.
