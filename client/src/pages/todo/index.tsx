import { FC } from "react"

import Layout from "@/components/layout"
import TodoCreateButton from "@/components/todo/create"
import { useGetTodosQuery, useUpdateTodoMutation } from "@/generated/graphql"
import TodoRemoveButton from "@/components/todo/remove"
import { CheckCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const Todo: FC = () => {
  const { data } = useGetTodosQuery()
  const [mutate] = useUpdateTodoMutation()

  const handleComplete = async (id: string) => {
    await mutate({
      variables: {
        data: {
          id,
          completed: true,
        },
      },
    })
  }

  return (
    <Layout>
      <div className="container mx-auto mt-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Todos</h1>
          <TodoCreateButton />
        </div>
        <section className="mt-2">
          {data?.todos?.map((todo) => (
            <div key={todo.id} className="flex justify-between gap-y-1">
              <div className="flex items-center gap-x-2">
                {todo.completed ? (
                  <span className="">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() => handleComplete(todo.id)}
                  >
                    <Circle className="w-5 h-5" />
                  </span>
                )}
                <p className={cn({ "line-through": todo.completed })}>
                  {todo.title}
                </p>
              </div>
              <TodoRemoveButton id={todo.id} />
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Todo
