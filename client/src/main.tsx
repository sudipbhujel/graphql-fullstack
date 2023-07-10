import { client } from "@/lib/client"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import { ApolloProvider } from "@apollo/client"
import { Toaster } from "./components/ui/toaster.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider {...{ client }}>
      <App />
      <Toaster />
    </ApolloProvider>
  </React.StrictMode>
)
