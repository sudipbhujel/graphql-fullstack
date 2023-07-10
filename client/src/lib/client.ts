import {
  ApolloClient,
  InMemoryCache,
  ServerError,
  createHttpLink,
  from,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { redirect } from "react-router-dom"
import { removeLoginToken, retrieveLoginToken } from "./localstorage-helper"

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = retrieveLoginToken()
  // return the headers to the context so httpLink can read them
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const logoutLink = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === 401) {
    removeLoginToken()
    redirect("/")
  }
})

export const client = new ApolloClient({
  link: from([authLink, logoutLink, httpLink]),
  cache: new InMemoryCache({}),
})
