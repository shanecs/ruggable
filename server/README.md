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

## Considerations

### Assumptions

#### Response

##### Length

The length field in the response body represents the total length of the rugs being printed, and not the indicated available length of the roll.

##### Plan

The plan will not contain more rugs then could be printed on the available length of the roll (as indicated by the `roll_length` param).

### Database

Generically the database represents reasonable data model, easily navigated. One change that I would propose to to change the size field, from one text string with a particular format. This field could easily break the code in the event that an incorrect record was ever inserted into the database. Rather, I would recommend switching the field to two float fields. This would enable the database to enforce data structure better, without relying on external systems to obey the formatting rules.

### Additional Features

I included a few additional features to support scalability and future use cases.

#### Width Param

The requirements supplied, indicated that the code should assume that rolls are always five (5) feet in width. While this would easily work initially, I could easily see that this could be needed to be adjusted in the future (for example, if the different printer was selected). One additional functionality that this would enable is to allow the user to supply width, in addition to length, in the event that multiple different roll widths were to be used.

#### Orientation

The code currently orients the rug with the largest dimension smaller than the width of the rug oriented on the width. A future area of development could be selecting the orientation that best optimizes usage of the material, when also factoring in side by side printing.

#### Side by Side Printing

The requirements indicated that specific rugs can be printed side by side. Specifically, it indicates that the 2.5x7 runners are the ones that can be printed side by side. Rather than the code hard coding certain rugs that can be printed in this manner, it focuses on selecting side by side printing dynamically. This feature would become more beneficial if additional role widths were introduced or other rug sizes that might pair with other rugs. Currently, the code will look to keep on selecting rugs until it has used up as much width as possible. One limitation of this code currently is that the code will simply look to grab the first rug that is next up that will fit into the space. It doesn't intelligently look at the dimensions of other rugs when considering them for side by side printing (such as ensuring that length matches its neighbors or that it stretches the full remaining width).

##### Component Status

> Feature Toggle

I added one feature that was not mentioned in the requirements. The code now has the capability to update the `component` table, to indicate a status of `Printing`. This can toggled on by updating the value of the `UPDATE_COMPONENT_STATUS` toggle in the [feature toggle file](./src/shared/toggles/printList.ts). The reason for adopting this feature is to enable multiple clients using this endpoint at the same time. Essentially, this would prevent two clients getting the same list of rugs if they both request before the other can complete the full print run.
