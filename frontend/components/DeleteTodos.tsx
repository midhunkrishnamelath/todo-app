import { deleteProject } from "@/api/projects";
import { deleteTodo } from "@/api/todos";
import { UUID } from "crypto";
import React from "react";

export default function DeleteTodo({
  setLoading,
  todoId,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  todoId: UUID;
}) {
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      let res = await deleteTodo(todoId);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <button
      className="p-1 m-1 text-white rounded-lg disabled:bg-gray-400"
      onClick={handleSubmit}
    >
      <img src="/deletebutton.svg" alt="Delete" className="w-4 h-4" />
    </button>
  );
}
