#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises"
import { networkInterfaces } from "node:os"
import { join, resolve } from "node:path"
import { parseArgs } from "node:util"
import QRCode from "qrcode"

const { values } = parseArgs({
  options: {
    ssid: { type: "string", default: process.env.WIFI_SSID },
    password: { type: "string", default: process.env.WIFI_PASSWORD },
    security: { type: "string", default: process.env.WIFI_SECURITY ?? "WPA" },
    visible: { type: "boolean", default: false },
    url: { type: "string", default: process.env.SITE_URL },
    port: { type: "string", default: process.env.PORT ?? "80" },
    out: { type: "string", default: "qr" },
    help: { type: "boolean", short: "h", default: false },
  },
})

const usage = `
npm run qr -- --ssid <назва мережі> --password <пароль> [--url http://192.168.50.10] [--port 80] [--visible]

  --ssid       назва Wi-Fi мережі (або WIFI_SSID)
  --password   пароль (або WIFI_PASSWORD); для відкритої мережі: --security nopass
  --security   WPA | WEP | nopass (за замовчуванням WPA)
  --visible    мережа не прихована (за замовчуванням вважаємо прихованою)
  --url        адреса сайту; якщо не вказана — IP цієї машини в локальній мережі
  --port       порт для автоматично визначеної адреси (за замовчуванням 80)
  --out        тека для результату (за замовчуванням qr/)
`

if (values.help || !values.ssid) {
  console.log(usage)
  process.exit(values.help ? 0 : 1)
}

const isPrivate = ip => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)

function detectLanUrl(port) {
  const addresses = Object.values(networkInterfaces())
    .flat()
    .filter(a => a && a.family === "IPv4" && !a.internal)
    .map(a => a.address)
  const ip = addresses.find(isPrivate) ?? addresses[0]
  if (!ip) return null
  return port === "80" ? `http://${ip}` : `http://${ip}:${port}`
}

const escapeWifi = value => value.replace(/([\\;,:"])/g, "\\$1")

const security = values.security.toUpperCase() === "NOPASS" ? "nopass" : values.security.toUpperCase()
const wifiPayload = [
  "WIFI:",
  `T:${security};`,
  `S:${escapeWifi(values.ssid)};`,
  security === "nopass" ? "" : `P:${escapeWifi(values.password ?? "")};`,
  values.visible ? "" : "H:true;",
  ";",
].join("")

const siteUrl = values.url ?? detectLanUrl(values.port)
if (!siteUrl) {
  console.error("Не вдалося визначити IP у локальній мережі. Вкажи адресу: --url http://192.168.50.10")
  process.exit(1)
}

const qrOptions = { type: "svg", errorCorrectionLevel: "M", margin: 1, color: { dark: "#000000", light: "#ffffff" } }
const [wifiSvg, siteSvg] = await Promise.all([
  QRCode.toString(wifiPayload, qrOptions),
  QRCode.toString(siteUrl, qrOptions),
])

const escapeHtml = value =>
  value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

const card = (step, title, svg, lines) => `
  <section class="card">
    <div class="step">${step}</div>
    <h2>${title}</h2>
    <div class="qr">${svg}</div>
    ${lines.map(([label, value]) => `<p><span>${label}</span><b>${escapeHtml(value)}</b></p>`).join("")}
  </section>`

const html = `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AntiCorruption AI — підключення</title>
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px;
    font-family: "Inter Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: #000;
    background:
      radial-gradient(at 0% 0%, #c9e7f4 0, transparent 55%),
      radial-gradient(at 100% 20%, #f4d9e6 0, transparent 50%),
      radial-gradient(at 20% 100%, #e2ddf7 0, transparent 50%),
      radial-gradient(at 90% 100%, #f9edcc 0, transparent 55%),
      linear-gradient(160deg, #d8eef6, #e6e2f8 35%, #f7e3ec 65%, #faf1d6);
  }
  main { width: min(960px, 100%); }
  h1 { font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; margin-bottom: 8px; }
  .lead { color: #5f636b; font-size: 18px; margin-bottom: 32px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
  .card { background: #fff; border-radius: 28px; padding: 32px; text-align: center; }
  .step {
    width: 40px; height: 40px; margin: 0 auto 12px; border-radius: 50%;
    display: grid; place-items: center; background: #000; color: #fff; font-weight: 700;
  }
  h2 { font-size: 22px; margin-bottom: 20px; }
  .qr svg { width: 100%; max-width: 320px; height: auto; }
  p { display: flex; justify-content: space-between; gap: 12px; margin-top: 12px; font-size: 16px; text-align: left; }
  p span { color: #5f636b; }
  p b { word-break: break-all; text-align: right; }
  @media print {
    body { background: #fff; padding: 0; }
    .card { border: 1px solid #d4d6da; break-inside: avoid; }
  }
</style>
</head>
<body>
<main>
  <h1>AntiCorruption AI</h1>
  <p class="lead">Наведіть камеру планшета на QR-код: спочатку підключіться до Wi-Fi, потім відкрийте сайт.</p>
  <div class="grid">
    ${card("1", "Підключитися до Wi-Fi", wifiSvg, [
      ["Мережа", values.ssid],
      ...(security === "nopass" ? [] : [["Пароль", values.password ?? ""]]),
    ])}
    ${card("2", "Відкрити сайт", siteSvg, [["Адреса", siteUrl]])}
  </div>
</main>
</body>
</html>
`

const outDir = resolve(values.out)
await mkdir(outDir, { recursive: true })
await Promise.all([
  writeFile(join(outDir, "index.html"), html),
  writeFile(join(outDir, "wifi.svg"), wifiSvg),
  writeFile(join(outDir, "site.svg"), siteSvg),
])

console.log(`
QR готові: ${join(outDir, "index.html")}
  Wi-Fi: ${values.ssid}${values.visible ? "" : " (прихована мережа)"}
  Сайт:  ${siteUrl}
`)
