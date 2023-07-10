import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import ErrorPage from "./error-page"
import Home from "./pages"
import Login from "./pages/login"
import Protected from "./pages/protected"
import { retrieveLoginToken } from "./lib/localstorage-helper"

const loginLoader = () => {
  const token = retrieveLoginToken()
  if (token) return redirect("/")
  return null
}

const authenticated = () => {
  const token = retrieveLoginToken()
  if (!token) return redirect("/login")
  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
  {
    path: "/protected",
    element: <Protected />,
    errorElement: <ErrorPage />,
    loader: authenticated,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
