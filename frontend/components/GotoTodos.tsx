import { deleteProject } from "@/api/projects";
import { UUID } from "crypto";
import { useRouter } from "next/router";
import React from "react";

export default function DeleteProject({
  setLoading,
  projectId,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: UUID;
}) {
  const router = useRouter();

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setLoading(true);
      router.push(`/projects/$`);
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
