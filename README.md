# 👨🏽‍💻 RMS portal

## 📌 Features

This project is updated with:

- [React 18x](https://reactjs.org)
- [MUI 5x](https://mui.com/)
- React Query
- Redux
- Axios

## 🧐 Getting Started

1. Check if your [Node.js](https://nodejs.org/) version is >= 16.
2. Clone this repository.
3. Create an env setting `cp env-example .env`.
4. You can use `npm` or `yarn` for package manager. ex:

- NPM

  - Run `npm install` to install the dependencies.
  - Run `npm start` for development.
  - Run `npm run build` for build.

**Note: please run `npm run prepare` if git pre-commit not work properly**

Open http://localhost:3000 with your browser to see the result.

- Run script:
  - `npm run start` : start project
  - `npm run build` : build project
  - `npm run format` : format all file with prettier
  - `npm run lint:check` : check error and warning by eslint
  - `npm run lint:fix` : fix all fixable problem by eslint
  - `npm run prepare` : run before any npm script. Specifically for this project: set up git hook core.hooksPath
  - `npm run sonar` : run sonarqube scanner

## CORS issues:

- if you run into CORS issue in development, follow this instruction:
  - add "proxy" : "gateway url here" in package.json
  - go to src/core/api/http.ts and remove baseURL property on axios.create function
