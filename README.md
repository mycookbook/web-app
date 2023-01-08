# MyCookbook HQ Web Application

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

MyCookbook HQ Web application built with Vue 3, Nuxt 3 and Typescript

## Plugins
> Which helps to maintain project code quality.
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Standard version](https://github.com/conventional-changelog/standard-version)

## Before getting started
Make sure you have installed [Node.js 16.11.0 or higher](https://nodejs.org/en/) on your machine.
You can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple node version on your machine.

```bash
nvm install 16.11.0
nvm use
```

## Getting started
You can setup this project using npm package.
### Clone repo

```bash
# ssh
git clone git@github.com:mycookbook/web-app.git
```

### Navigate to cloned repo

```bash
cd web-app
```

### Setup
Make sure to install the dependencies:

```bash
# npm
npm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
# npm
npm run dev
```

### Production

Build the application for production

```bash
# npm
npm run build
```

Locally preview production build

```bash
# npm
npm run preview
```

### Lint

```bash
# npm
npm run lint
```

### Lint fix

```bash
# npm
npm run lint:fix
```

### Lint style

```bash
# npm
npm run lint:style
```

### Lint style fix

```bash
# npm
npm run lint:style:fix
```

### Commit

Open interactive terminal to write conventional commit message

```bash
# npm
npm run commit
```

### Release

Create a release tag and generates change log based on commit history

```bash
# npm
npm run release
```

## References

* Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
