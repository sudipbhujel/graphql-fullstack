import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import "./App.css"
import ErrorPage from "./error-page"
import Home from "./pages"
import Login from "./pages/login"
import Protected from "./pages/protected"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return children
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: () => {
      const token = localStorage.getItem("accessToken")

      if (token) {
        return redirect("/login")
      }
      return null
    },
  },
  {
    path: "/protected",
    element: <Protected />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const at = localStorage.getItem("accessToken")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${at || ""}`,
        },
        body: JSON.stringify({
          query: `query Profile {
            profile {
              id
              firstName
              lastName
            }
          }`,
        }),
      }).then((res) => res.json())

      if (data) {
        // TODO: Check profile
        return null
      }
      return redirect("/")
    },
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
