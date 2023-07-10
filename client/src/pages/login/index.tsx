import Layout from "@/components/layout"
import LoginForm from "@/components/login"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FC } from "react"

const Login: FC = () => {
  return (
    <Layout>
      <div className="grid h-screen place-items-center bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Login
