
## Library
1. prisma
2. class validator
3. multer file upload
4. bcrypt
## Arsitektur modular
 1. Model
 2. Service
 3. Controller

## Installasi postgreSql
1. $ sudo docker docker-compose up -d
2. Import file database.backup

## Environment
Buat file .env 

DATABASE_URL="postgres://giftuser:gift@localhost:5432/productDb?schema=public"

JWT_PRIVATE_KEY=keyJwtsecurity

JWT_EXPIRE_TIME=72000000



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
