import { FC } from "react"
import Navbar from "../nav"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
