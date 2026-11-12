# frontend-template

**React 19 + Vite + TypeScript**, Mantine 9, React Router 8, TanStack Query.

```bash
nvm use                 # Node 22 (.nvmrc)
npm i
cp .env.example .env
npm run dev             # http://localhost:5173
```

`VITE_USE_MOCKS=true` — дані беруться з моків.

Docker:

```bash
docker compose up --build   # http://localhost
```

## Скрипти

| Команда                                    | Що робить                                     |
| ------------------------------------------ | --------------------------------------------- |
| `npm run dev`                              | dev-сервер з HMR                              |
| `npm run build`                            | перевірка типів + прод-збірка в `dist/`       |
| `npm run preview`                          | роздати `dist/` локально (порт 4173)          |
| `npm run check`                            | типи + eslint + prettier + тести (як у CI)    |
| `npm run lint` / `lint:fix`                | ESLint                                        |
| `npm run format`                           | Prettier (`@fxhxyz/prettier-config`)          |
| `npm test` / `test:watch`                  | Vitest                                        |
| `npm run docker:build` / `docker:run`      | образ без compose                             |
| `npm run host` / `host:stop` / `host:logs` | запуск на своїй машині для журі               |
| `npm run qr`                               | QR-коди: Wi-Fi мережа + адреса сайту          |
