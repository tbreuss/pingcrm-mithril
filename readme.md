![Build & Deploy](https://github.com/tbreuss/pingcrm-mithril/workflows/Build%20&%20Deploy/badge.svg)

# Ping CRM on Mithril.js

A [Mithril.js](https://mithril.js.org) demo application to illustrate how [Inertia.js](https://inertiajs.com) works.

With Inertia you are able to build single-page applications using classic server-side routing and controllers, without building an API.

This application is a port of the original Ping CRM written in Laravel and Vue.js.

The frontend is written in Mithril.js, a modern client-side JavaScript framework for building Single Page Applications.
The backend is edited as little as possible to enable direct comparison between Mithril.js and Vue.js, and to merge the upstream repository into this fork without effort.

![](https://raw.githubusercontent.com/inertiajs/pingcrm/master/screenshot.png)

## Demo

<https://pingcrm-mithril.tebe.ch>

## Installation

Clone the repo locally:

```sh
git clone https://github.com/inertiajs/pingcrm.git pingcrm
cd pingcrm
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm ci
```

Build assets:

```sh
npm run dev
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly.

```sh
touch database/database.sqlite
```

Run database migrations:

```sh
php artisan migrate
```

Run database seeder:

```sh
php artisan db:seed
```

Run the dev server (the output will give the address):

```sh
php artisan serve
```

You're ready to go! Visit Ping CRM in your browser, and login with:

- **Username:** johndoe@example.com
- **Password:** secret

## Running tests

To run the Ping CRM tests, run:

```
phpunit
```

## Credits

- Original work by Jonathan Reinink (@reinink) and contributors
- Port to Mithril.js by Thomas Breuss (@tbreuss)
