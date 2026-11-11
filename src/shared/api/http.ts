import { env } from "@/shared/config"

export class HttpError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "HttpError"
    this.status = status
  }
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const isForm = init?.body instanceof FormData
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    headers: { ...(isForm ? {} : { "Content-Type": "application/json" }), ...init?.headers },
  })
  if (!res.ok) throw new HttpError(res.status, await res.text())
  return (res.status === 204 ? undefined : await res.json()) as T
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockable<T>(mock: () => T, real: () => Promise<T>): Promise<T> {
  if (!env.useMocks) return real()
  await sleep(300)
  return mock()
}
