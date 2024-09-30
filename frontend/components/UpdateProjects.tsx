import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateProject } from "@/api/projects";
import { UUID } from "crypto";

export default function UpdateProject({
  project,
  setLoading,
}: {
  project: { id: UUID | null; title: string };
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [projectData, setProjectData] = useState({
    id: project.id,
    title: project.title,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      let userId = localStorage.getItem("id");
      let res = await updateProject(projectData, userId);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProjectData({ id: null, title: "" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="pp-1 m-1 text-white rounded-lg disabled:bg-gray-400">
        <img src="/editbutton.svg" alt="Delete" className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Edit Project</DialogTitle>
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
