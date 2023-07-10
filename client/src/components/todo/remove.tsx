import { useRemoveTodoMutation } from "@/generated/graphql"
import { client } from "@/lib/client"
import { Trash } from "lucide-react"
import { FC } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"

type TodoRemoveButtonProps = {
  id: string
}

const TodoRemoveButton: FC<TodoRemoveButtonProps> = ({ id }) => {
  const { toast } = useToast()

  const [mutate] = useRemoveTodoMutation()

  const onSubmit = async () => {
    await mutate({
      variables: { id },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onCompleted() {
        await client.refetchQueries({
          include: ["GetTodos"],
        })
        // setAuth(data.createTodo, data.login.jwt)
        toast({
          title: "Success",
          description: "Todo is removed",
          variant: "destructive",
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TodoRemoveButton
