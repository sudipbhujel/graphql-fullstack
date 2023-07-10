import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useLocation,
} from "react-router-dom"
import ErrorPage from "./error-page"
import { retrieveLoginToken } from "./lib/localstorage-helper"
import Home from "./pages"
import Login from "./pages/login"
import Todo from "./pages/todo"

const loginLoader = () => {
  const token = retrieveLoginToken()
  if (token) return redirect("/")
  return null
}

const ProtectedElement = ({ children }: { children: JSX.Element }) => {
  const token = retrieveLoginToken()
  const location = useLocation()

  if (!token) {
    const path = `/login?next=${location.pathname}`

    return <Navigate to={path} />
  }
  return children
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
    path: "/todos",
    element: (
      <ProtectedElement>
        <Todo />
      </ProtectedElement>
    ),
    errorElement: <ErrorPage />,
    // loader: authenticated,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
