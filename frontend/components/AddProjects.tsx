import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addProject } from "@/api/projects";

const defaultProjectData = {
  title: "",
};

export default function AddProject({setLoading}:{setLoading:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [projectData, setProjectData] = useState(defaultProjectData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    try {
        let userId = localStorage.getItem("id");
      let res = await addProject(userId,projectData);
     setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
        setProjectData(defaultProjectData);
    }
  };


  return (
    <Dialog>
      <DialogTrigger className="p-2 m-2 w-40 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
        Add Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Add Project</DialogTitle>
          <DialogDescription>
            <input
              name="title"
              className="w-full [outline:none] bg-[transparent] h-[45px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border font-poppins text-lg text-black"
              placeholder="Title"
              type="text"
              value={projectData.title}
              onChange={handleInputChange}
              required
            />
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
