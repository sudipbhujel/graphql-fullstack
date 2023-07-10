import { cn } from "@/lib/utils"
import { FC } from "react"
import { Link } from "react-router-dom"
import { UserNav } from "./user-nav"
import { useAuthStore } from "@/store/auth-store"
import { buttonVariants } from "../ui/button"

const Navbar: FC = () => {
  const { user } = useAuthStore()

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", "mx-6")}>
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <UserNav />
          ) : (
            <Link
              to="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
