# spotify

### Environment variables

Backend

- `GREETING`

Frontend

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

### Start all project via Docker in DEV mode

```shell
npm run dev
```

### Start all project via Docker in PROD mode

```shell
npm run prod
```
