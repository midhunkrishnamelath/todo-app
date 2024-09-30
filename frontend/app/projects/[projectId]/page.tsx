"use client"; // Add this to make the component a client component

import { UUID } from "crypto";
import { getTodos } from "../../../api/todos";
import { useState, useEffect } from "react";
import AddTodo from "@/components/AddTodo";
import UpdateTodo from "@/components/UpdateTodos";
import DeleteTodo from "@/components/DeleteTodos";
import { useParams, useSearchParams } from "next/navigation";
import ExportGist from "@/components/ExportGist";

interface Todo {
  id: UUID;
  description: string;
  status: TodoStatus;
}

enum TodoStatus {
  Pending = "pending",
  Complete = "complete",
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  const searchParams = useSearchParams();

  const projectName = searchParams.get("name");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let res = await getTodos(projectId);
        setTodos(res.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loading && fetchTodos();
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-full h-screen flex flex-col items-center">
        <div className=" h-24 w-full px-16 font-bold text-4xl p-2 m-4 flex flex-row justify-between">
          <h1 className="flex items-center">{projectName}</h1>
          <div>
            <AddTodo setLoading={setLoading} projectId={projectId} />
            <ExportGist todos={todos} projectName={projectName} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {todos?.map((todos) => (
            <div
              key={todos.id}
              className="max-w-sm w-full lg:w-1/3 border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-col"
            >
              <div>
                <h2 className="text-xl text-black font-bold mb-2">
                  {todos.description}
                </h2>
              </div>
              <div className="flex">
                <h2 className="text-md text-black mb-2">{todos.status}</h2>
                <div className="ml-auto">
                  <DeleteTodo setLoading={setLoading} todoId={todos.id} />
                  <UpdateTodo
                    setLoading={setLoading}
                    todo={todos}
                    projectId={projectId}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
