# E-commerce-Fullstack-Typescript-Project

## Planning

1.  [✔] Project init
2.  [✔] Explore files in the template
3.  [✔] Config routers
4.  [✔] Create MongoDB models/schema
5.  [✔] Create services
6.  [✔] Create controllers
7.  [✔] Setup CRUD operations endpoints
8.  [✔] Add needed middleware(s)
9.  [✔] Client side/Frontend implementation
10. [✔] Security(?)
11. [✘] Testing(?)

## Prerequisites

1. Install mongodb or use MongoDB Atlas (cloud version)
2. Install nodejs (if you don't have it already)

## Setting Up for `API folder`

1. Create a `.env` file in the root directory and copy the content from `.env.example`

2. Make sure mongodb is running (if you are using local MongoDB)
3. Install dependencies: `yarn`
4. Use this command for development mode: `yarn run start:dev`
5. If you need to customize your env, take a look at `secrets.ts` file

## Requirements

Below are the steps that you need to finish in order to finish this module

1. Explore the code base of the api folder, start with `server.ts` and `app.ts`
2. Client folder is for the react frontend. Start with `api` first before moving on to `client`
3. Create all the mongoose schema for your ERD
4. Create CRUD endpoints for all the schema
5. Separate the routers and controller, controller goes into the controller folders. Controllers only handles request and response, and will call service to process business logics.
6. Create more controller for your app if needed. Eg: borrow books, add product to order
7. For business logic like saving data to database, filtering, searching or updating, these are services and goes into services folder
8. Add authentication middleware using passport, google and jwt strategy
9. Add tests for your controllers and services. Remember to create the jwt token for your tests, because if your controller is protected, then the test should send the token also
