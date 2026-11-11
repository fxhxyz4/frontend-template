import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "@/app/App"

import "@fontsource-variable/inter/index.css"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "@/app/styles/global.scss"

const root = document.getElementById("root")
if (!root) throw new Error("#root not found")

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
