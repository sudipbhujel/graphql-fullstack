// auth-store.ts

import { AuthEntity } from "@/generated/graphql"
import { removeLoginToken, saveLoginToken } from "@/lib/localstorage-helper"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type AuthStore = {
  user: AuthEntity | null
  token: string | null
  setAuth: (user: AuthEntity, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    devtools((set) => ({
      user: null,
      token: null,
      setAuth: (user: AuthEntity, token: string) => {
        saveLoginToken(token)
        set({ user, token }, false, "setAuth")
      },
      logout: () => {
        removeLoginToken()
        set({ user: null, token: null }, false, "logout")
      },
    })),
    { name: "auth" }
  )
)
