import { useLoginMutation } from "@/generated/graphql"
import { useAuthStore } from "@/store/auth-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as z from "zod"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

const LoginForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { setAuth } = useAuthStore()

  const [mutate, { loading }] = useLoginMutation()

  const next = searchParams.get("next") || "/"

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutate({
      variables: { data },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onCompleted(data, _clientOptions) {
        setAuth(data.login, data.login.jwt)
        toast({
          title: "Success",
          description: "You are now logged in",
          duration: 2000,
        })

        navigate(next)
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onError(error, _clientOptions) {
        toast({
          title: "Error",
          description: error?.message || "Something went wrong",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="demo@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
