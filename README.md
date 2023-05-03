# spotify

### Repository secrets

Vercel secrets

- `VERCEL_TOKEN`
- `VERCEL_BACKEND_ORGANIZATION_ID`
- `VERCEL_BACKEND_PROJECT_ID`
- `VERCEL_FRONTEND_ORGANIZATION_ID`
- `VERCEL_FRONTEND_PROJECT_ID`

Environment

- `GREETINGS`

### Environment variables

Backend

- `GREETINGS`

Frontend

[//]: # (- `NEXT_PUBLIC_BACKEND_URL`)

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

### How to correctly add new environment variable

For example, you have new variable for server named `VARIABLE`

1. Go to `env-variables.json` and add there to `server` array `"VARIABLE"` item 
2. Go to `.github/workflows/deploy.yaml` and add string `VARIABLE: ${{ secrets.VARIABLE }}` to env block in the top of file
3. Go to `Settings -> Secrets and variables -> Actions` on GitHub and add secret `VARIABLE` with it value there
4. Push changes to `main` branch
