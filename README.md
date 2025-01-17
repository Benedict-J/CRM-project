# CRM-project: Citrus Contact

[![Node.js CI](https://github.com/Team-72-Passfinder/CRM-project/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Team-72-Passfinder/CRM-project/actions/workflows/nodejs.yml)

Our main, actual, real repo for the project.

It's a CRM with a different C. This software is used to manage the user's contacts and their relationships, which can be either professional or personal. In addition, it's also _may_ have a instant message feature.

## Table of content

- [Contribute guideline](#contribute-guideline)
- [Repo structure](#repo-structure)
  - [Content of .env file](#content-of-env-file)
- [Coding style (backend)](#coding-style-for-backend)
- [Example workflow](#example-workflow)
- [Reading resources](#reading-resources)

## Contribute guideline

We will follow a **trunk-based approach**, where developers collaborate on a single branch and avoid creating other long-lived feature branches. We will create a branch, code it, pull request it and merge it. Then we will create another branch to code other part of the software. This avoid merge hell when we finalize the product.

Note: Alway run `npm test` on root folder first before create a pull request, even if you changed only frontend. The reason is mongoDB need some time to "wake up" first (as we used free version), so this will make sure that the CI test on Github will run successful. If the `npm test` fail and you sure that you don't change anything that may affect it, re-run it a few more times.

**Naming convention**:

- For files and folders, use lowercase letter and hyphen between words. Examples: `file-name`, `backend`, `main-file.js`, `src/a-very-long-file-name.js`, etc..

- For branch, they should have a clear and concise name what they are implementing (should focus on one task at a time). Use hyphen or space between words for better clarity. Example: `mocha-test`, `schema DB`, `User-Authentication`, etc..

In addition, it's better to **commit frequently**. This way, we can easily see the reasons for code change and follow the thought process of the developer. Don't mistake between commit and push/pull request though.

**Exception**: For documentation and `README` file (simple text files), you can just push them directly. No need to pull request.

**TLDR:** Use branching feature, commit a lot and use pull request.

## Installation

Add `.env` file at the root of the project. Fill neccessary information into it (contact Lam if you don't know).

In the project directory, you can run these in the terminal:

### Core commands

#### `npm install` at root and client folder

To install the neccessary dependencies. Remember to do this in both root folder and `/client` folder.

#### `npm run build` at client folder

To build static files.

#### `npm start` at client folder

To start the frontend.

#### `npm run dev` at root folder

To runs the server backend in the development mode.

After run all above commands (ideally in 2 terminals, one for frontend and one for backend), it should open a new web window at `localhost:3000` and displayed some frontpage content there.

### More commands

#### `npm test` at root folder

To runs the Mocha tests in `/test` folder.

## Repo structure

```bash
|__docs/
|__prototypes/
|__test/
|__img/
|__client/  ** THIS IS EVERYTHING FROM THE REACT SIDE **
    |__ node_modules/  ** THIS BELONG TO FRONTEND
        |__ tons of stuff...
    |__ public/
        |__ index.html
        |__ favicon.ico
        |__ etc.
    |__ src/
        |__ index.js
        |__ App.js
        |__ etc.
|__ node_modules/  ** THIS BELONG TO BACKEND
    |__ stuff...
|__ models/
    |__ user.js
    |__ event.js
    |__ etc.
|__ config/
    |__ config.js
|__ routes
    |__ userRoutes.js
    |__ eventRoutes.js
    |__ etc.
|__ .gitignore
|__ .env  ** ALTHOUGH GITIGNORED, IT IS REQUIRED
|__ package.json
|__ server.js
|__ etc.
```

### Content of .env file

This file is placed at project's root (same as `server.js`)

```bash
# Backend stuff
port = _____
host = _____

#### DB_CONFIG ####
DB_USER     = _____
DB_PASSWORD = _____
DB_URL      = _____
DB_NAME     = _____
DB_TEST_NAME = _____

# Passport and JWT
PASSPORT_SECRET = _____

# Nodemailer
NODEMAILER_SERVICE = _____
NODEMAILER_USER = _____
NODEMAILER_PASS = _____
```

## Coding style (for backend)

Indent space: 2

Variable name: camelCase. Example: smallNumber, dateOfBirth.

Database model name: Start with uppercase. Example: User, Contact, Event.

Use `const` when require modules.

For frontend, follow the `README.md` in folder `client`.

## Example workflow

(From lecture 2 slides)
![Example workflow image](img/workflow_example.png 'Example workflow')

## Reading resources

<https://www.toptal.com/software/trunk-based-development-git-flow>
<https://www.youtube.com/watch?v=2AIL1c-cJM0&ab_channel=TheFullStackJunkie>
