# Food Track

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pl](https://img.shields.io/badge/lang-pl-white.svg)](README.pl.md)

## Project description

Food Track is an online calorie counter. Features include:

- recording of consumed food products by selected day and meal,
- adding new products to the database (entries require administrator approval),
- automatic calculation of consumed calories and macronutrients (total daily count as well as within each meal),
- setting the daily caloric and macronutrients goals.

## Links

### API repository

https://github.com/dom-ini/food-track-api/

## Tech stack

- React 18
- Bootstrap 5

## Getting started

First, run the API from the back-end repository. You can log into the admin console and add some example products.

In the project directory, create _.env_ file and add the required values (you can see _.env.example_ file for reference).

Run `npm i` to install dependencies and `npm run start` to run the development server.

Open http://localhost:3000/ in your browser and see the results.
