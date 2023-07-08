import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { client } from "@/lib/client"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider {...{ client }}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
