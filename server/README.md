# Ruggable Back End Technical Challenge

## Description

This is a back-end technical challenge for Ruggable. The goal of the challenge is to create an API endpoint, which returns to the requestor a ordered list of rugs rxjsto be printed.

Additional information can be located in the instruction [README](../README.md).

## Installation

### Setup

This code base does not manage the database directly. It was built and tested using a Postgres database.

To configure database access, update the [.env](./.env) file with the correct database URL, using the following pattern:

```bash
# Pattern
DATABASE_URL="postgres://[Username]:[Password]@[Domain]:[Port]/[Database]"

# Example
DATABASE_URL="postgres://writer:ksif7f3@kf9@127.0.0.1:[/ruggable"
```

### Dependencies

To install the dependencies and configure the project, run the following command:

```bash
$ yarn
```

### Prisma (ORM)

The following commands can be used to manage the database connection.

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


## Running the app

Below are the various commands that can be used to start the webserver for the API. There are various options depending on environment and desired additional features desired.

```bash
# Development
$ yarn start

# Watch Mode
$ yarn start:dev

# Debug Mode
$ yarn start:debug


# Production Mode
$ yarn start:prod

```

## Testing

To perform testing on the project, use the following commands, which will run unit and end-to-end tests as well as determine testing coverage.

```bash
# Unit Tests
$ yarn test

# E2E Tests
$ uarn test:e2e

# Test Coverage
$ yarn test:cov
```

## Code Style

Sync your IDE with project eslintrc.js.

Check `Run ESLint --fix on save`


