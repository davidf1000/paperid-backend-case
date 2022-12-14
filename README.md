# Paper.id Backend Engineer Case

Author : David Fauzi

## Tech Stacks :

- Typescript
- NodeJS (ExpressJS)
- MySQL
- TypeORM
- Jest
- Swagger (OpenAPI)
- Bcrypt and JWT

## Run locally

install node_modules

```bash
npm i
```

start (development)

```bash
npm run dev
```

create .env with .env.example as key value example

## Swagger OpenAPI Docs
</br>

![](https://github.com/davidf1000/paperid-backend-case/blob/main/docs/swagger.png)

</br>

API configuration place is located in src/swagger.json. Express will server the swagger-ui automatically. You can access the swagger docs from:
http://localhost:3000/docs

## Postman
</br>

![](https://github.com/davidf1000/paperid-backend-case/blob/main/docs/postman.png)

</br>
Import the postman to try all the API endpoint

## Database Migration

since there's some problem when trying to migrate DB using typeORM, we'll use mysql dump to migrate schema and data (already pre-filled with example financial accounts and transactions) by importing the sql dump (located in database/).
