import { FC } from "react"

import Layout from "@/components/layout"
import TodoCreateButton from "@/components/todo/create"
import { useGetTodosQuery } from "@/generated/graphql"
import TodoRemoveButton from "@/components/todo/remove"

const Todo: FC = () => {
  const { data } = useGetTodosQuery()

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
              <p>{todo.title}</p>
              <TodoRemoveButton id={todo.id} />
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Todo
