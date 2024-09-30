"use client"; // Add this to make the component a client component

import { UUID } from "crypto";
import { getProjects } from "../../api/projects";
import { useState, useEffect } from "react";
import AddProject from "@/components/AddProjects";
import DeleteProject from "@/components/DeleteProjects";
import UpdateProject from "@/components/UpdateProjects";
import { useRouter } from "next/navigation";

interface Project {
  id: UUID;
  title: string;
  todos: any[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let userId = localStorage.getItem("id");
        let res = await getProjects(userId);
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loading && fetchProjects();
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-full h-screen flex flex-col items-center">
        <div className=" h-24 w-full px-16 font-bold text-4xl p-2 m-4 flex flex-row justify-between">
          <h1 className="flex items-center">Projects</h1>
          <AddProject setLoading={setLoading} />
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="max-w-sm w-full lg:w-1/3 border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-row"
            >
              <h2 className="text-xl text-black font-bold mb-2">
                {project.title}
              </h2>
              <div className="ml-auto">
                <DeleteProject setLoading={setLoading} projectId={project.id} />
                <UpdateProject setLoading={setLoading} project={project} />

                <button
                  className="p-1 m-1 text-white rounded-full border-black border-[1px] disabled:bg-gray-400"
                  onClick={() =>
                    router.push(
                      `/projects/${project.id}?name=${encodeURIComponent(
                        project.title
                      )}`
                    )
                  }
                >
                  <img src="/arrowright.svg" alt="Delete" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
