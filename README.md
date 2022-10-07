# 👨🏽‍💻 RMS portal

## 📌 Features

This project is updated with:

- [React 18x](https://reactjs.org)
- [Antd 5x](https://ant.design/)
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

Open http://localhost:3000 with your browser to see the result.

## CORS issues:

- if you run into CORS issue in development, follow this instruction:
  - add "proxy" : "gateway url here" in package.json
  - go to src/core/api/http.ts and remove baseURL property on axios.create function
