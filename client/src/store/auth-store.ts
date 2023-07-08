// auth-store.ts

import { AuthEntity } from "@/generated/graphql"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type AuthStore = {
  user: AuthEntity | null
  accessToken: string | null
  setUser: (user: AuthEntity) => void
  setAccessToken: (accessToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    devtools((set) => ({
      user: null,
      accessToken: null,
      setUser: (user: AuthEntity) => set({ user }, false, "setUser"),
      setAccessToken: (accessToken: string) =>
        set({ accessToken }, false, "setAccessToken"),
      logout: () => set({ user: null, accessToken: null }, false, "logout"),
    })),
    { name: "auth" }
  )
)
