# spotify

### Environment variables

Backend

- `DATABASE_URL`

Frontend

- `REACT_APP_BACKEND_URL`

### Clone repository

```shell
git clone git@github.com:not-yumasoft/spotify.git
cd spotify
npm i
npm run init
```

### Run backend

```shell
cd server
npm run server:dev
```

Backend will start at 5555 port (you can change it by providing custom PORT environment variable)

### Run frontend

```shell
cd client
npm run client:dev
```

Frontend will start at 3000 port

### Start database via Docker

```shell
npm run db
```

### Start server via Docker (with database)

```shell
npm run server
```

### Start all project via Docker in DEV mode

```shell
npm run dev
```

### Start all project via Docker in PROD mode

```shell
npm run prod
```
