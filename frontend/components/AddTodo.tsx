import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addTodo } from "@/api/todos";
import { UUID } from "crypto";

enum TodoStatus {
  Pending = "pending",
  Complete = "complete",
}

const defaultTodoData = {
  description: "",
  status: TodoStatus.Pending,
};

export default function AddTodo({
  setLoading,
  projectId,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string | string[];
}) {
  const [todoData, setTodoData] = useState(defaultTodoData);

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
      let res = await addTodo(projectId, todoData);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTodoData(defaultTodoData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 m-4 w-40 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
        Add Todo
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
            className="p-1 m-1 w-12 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
