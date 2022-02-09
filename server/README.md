# Ruggable Back End Technical Challenge

## Description

This is a back-end technical challenge for Ruggable. The goal of the challenge is to create an API endpoint, which returns to the requestor a ordered list of rugs rxjsto be printed.

Additional information can be located in the instruction [README](../README.md).

## Installation

```bash
$ yarn
```

## Running the app

```bash
# Development
$ yarn start

# Watch <ode
$ yarn start:dev

# Debug Mode
$ yarn start:debug


# Production Mode
$ yarn start:prod

```

## Test

```bash
# Unit Tests
$ yarn test

# E2E Tests
$ uarn test:e2e

# Test Coverage
$ yarn test:cov
```

## Prisma (ORM)
```bash
# IDE for your database
$ npx prisma studio 

# run migrations (apply schema changes)
$ npx prisma migrate dev

# run migrations on CI/CD
$ npx prisma migrate deploy

# apply db schema changes to the prisma client
$ npx prisma generate
```

## Code Style
Sync your IDE with project eslintrc.js.

Check `Run ESLint --fix on save`
