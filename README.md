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

## Vercel

Для команди: прод-версія на моках, відкривається за посиланням.

1. Запушити репозиторій на GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import → обрати репозиторій. Налаштування підтягнуться з `vercel.json`.
3. Deploy. Кожен пуш у `main` оновлює прод, кожна гілка отримує свій preview-URL.

Адресу сайту для canonical, OG і sitemap Vercel підставляє сам. Сайт закритий від пошуковиків (`X-Robots-Tag: noindex`).

Без GitHub: `npx vercel --prod`.

## Хостинг на хакатоні

Своя машина + свій роутер із прихованою Wi-Fi мережею, журі заходить із планшетів. Інтернет не потрібен: шрифти й
іконки всередині збірки, зовнішніх запитів немає.

1. У роутері закріпити за хост-машиною IP (DHCP reservation), наприклад `192.168.50.10`.
2. У `.env`:

```bash
SITE_URL=http://192.168.50.10
WIFI_SSID=hackathon-jury
WIFI_PASSWORD=...
```

3. Запуск і QR:

```bash
npm run host        # http://192.168.50.10
npm run qr          # qr/index.html - відкрити на хост-машині або роздрукувати
```

4. Arch: відкрити порт 80, якщо ввімкнено файрвол: `sudo ufw allow 80/tcp`.

Без `--url` скрипт `qr` сам визначить IP машини в локальній мережі. `qr/` у `.gitignore`, там пароль від Wi-Fi.

## Редактор

`.vscode/settings.json`: Prettier форматує під час збереження, ESLint виправляє під час збереження. Рекомендовані
розширення перелічені в `.vscode/extensions.json`, VS Code сам запропонує їх встановити.
