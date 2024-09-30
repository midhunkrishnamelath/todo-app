import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTodo } from "@/api/todos";
import { describe } from "node:test";
import { UUID } from "crypto";

enum TodoStatus {
  Pending = "pending",
  Complete = "complete",
}

export default function UpdateTodo({
  todo,
  setLoading,
  projectId
}: {
  todo: { id: UUID| null; description: string; status: TodoStatus };
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string|string[];
}) {
  const [todoData, setTodoData] = useState({ id: todo.id , description: todo.description, status: todo.status });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      let userId = localStorage.getItem("id");
      console.log(todoData);
      let res = await updateTodo(projectId, todoData);
      console.log({ res });
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTodoData({ id: null , description: "", status: TodoStatus.Pending });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="pp-1 m-1 text-white rounded-lg disabled:bg-gray-400">
        <img src="/editbutton.svg" alt="Delete" className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle className="text-black">Add Todo</DialogTitle>
          <DialogDescription>
            <input
              name="description"
              className="w-full [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-lg text-black"
              placeholder="Title"
              type="text"
              value={todoData.description}
              onChange={handleInputChange}
              required
            />
            <select
              name="status"
              className="w-full mt-4 h-[45px] bg-transparent border border-gray-300 rounded-lg text-black"
              value={todoData.status}
              onChange={handleInputChange}
              required
            >
              <option value={TodoStatus.Pending}>Pending</option>
              <option value={TodoStatus.Complete}>Complete</option>
            </select>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="p-1 m-1 w-12 bg-green-500 text-sm text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
