import { useEffect } from "react"
import { useLocation } from "react-router"

import { env, site } from "@/shared/config"

type SeoProps = {
  title?: string
  description?: string
  noindex?: boolean
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.append(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.rel = "canonical"
    document.head.append(el)
  }
  el.href = href
}

export function Seo({ title, description = site.description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : site.name
    const url = `${env.siteUrl}${pathname}`

    document.title = fullTitle
    setMeta("name", "description", description)
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow")
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", url)
    setMeta("name", "twitter:title", fullTitle)
    setMeta("name", "twitter:description", description)
    setCanonical(url)
  }, [
    title,
    description,
    noindex,
    pathname,
  ])

  return null
}
