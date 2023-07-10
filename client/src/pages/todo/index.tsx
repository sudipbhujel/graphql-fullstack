import { FC } from "react"

import Layout from "@/components/layout"
import { useGetTodosQuery } from "@/generated/graphql"

const Todo: FC = () => {
  const { data } = useGetTodosQuery()

  return (
    <Layout>
      <div className="container mx-auto mt-2">
        <h1 className="text-xl font-bold">Todos</h1>
        <section className="mt-2">
          {data?.todos?.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Todo
