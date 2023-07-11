import { FC, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

import { useCreateTodoMutation } from "@/generated/graphql"
import { client } from "@/lib/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
  title: z.string().min(1, "Title is required"),
  description: z.string(),
})

const TodoCreateButton: FC = () => {
  const [open, setOpen] = useState(false)

  /**
   * Form Part
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const { toast } = useToast()

  const [mutate, { loading }] = useCreateTodoMutation()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutate({
      variables: { data },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onCompleted() {
        setOpen(false)
        form.reset()
        await client.refetchQueries({
          include: ["GetTodos"],
        })
        // setAuth(data.createTodo, data.login.jwt)
        toast({
          title: "Success",
          description: "Todo is added",
          duration: 2000,
        })
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>Add todo item.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TodoCreateButton
