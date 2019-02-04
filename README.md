# Interplanetary Academy

This app is deployed here: [https://interplanetary-academy.herokuapp.com/](https://interplanetary-academy.herokuapp.com/)

## Getting started

1. Fork and clone this repo
2. `npm install`
3. Start the build process and your application with: `npm run start:dev`. If you using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
4. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`

## Details

### The Premise

This is a campus/student record database management system, for the *Fictitious* Interplanetary Academy of JavaScript. It uses the NERP stack to create a RESTful web platform that allows us to manage students and campuses.

### The tools

For this project, I have used Express to handle HTTP requests and Sequelize to interface with the database. Likewise, I used React, Redux and React-Redux on the front-end. This means that all important state (i.e. students and campuses) is managed by the Redux store (unimportant state, like form data, may be managed by stateful React components). If side-effects are performed (like AJAX requests), they are encapsulated in thunks.

