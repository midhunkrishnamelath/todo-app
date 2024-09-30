import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import React from "react";

interface Todo {
  id: UUID;
  description: string;
  status: TodoStatus;
}

enum TodoStatus {
  Pending = "pending",
  Complete = "complete",
}

interface ExportGistProps {
  todos: Todo[] | null;
  projectName: string | null;
}

const ExportGist: React.FC<ExportGistProps> = ({ todos, projectName }) => {
  const router = useRouter();

  const exportGist = async () => {
    if (!todos || !projectName) {
      console.error("Todos or Project Name is null.");
      return;
    }

    const generateGistData = (
      projectName: string,
      todos: Todo[]
    ) => {
      const totalTodos = todos.length;
      const completedTodos = todos.filter(
        (todo) => todo.status === TodoStatus.Complete
      ).length;

      const pendingTodos = todos
        .filter((todo) => todo.status === TodoStatus.Pending)
        .map((todo) => `- [ ] ${todo.description}`)
        .join("\n");

      const completedTodosList = todos
        .filter((todo) => todo.status === TodoStatus.Complete)
        .map((todo) => `- [x] ${todo.description}`)
        .join("\n");

      const gistContent = `# ${projectName}\n\n` +
        `## Summary\n` +
        `${completedTodos} / ${totalTodos} completed.\n\n` +
        `## Pending Todos\n${pendingTodos || '- None'}\n\n` +
        `## Completed Todos\n${completedTodosList || '- None'}\n`;

      const gistData = {
        description: `Summary of todos for project: ${projectName}`,
        public: false,
        files: {
          [`${projectName}-todos.md`]: {
            content: gistContent,
          },
        },
      };

      return { gistData, gistContent };
    };

    const { gistData, gistContent } = generateGistData(projectName, todos);

    try {
      const response = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
        body: JSON.stringify(gistData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(result.html_url);

        const blob = new Blob([gistContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${projectName}-todos.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error("Error creating Gist:", result);
      }
    } catch (error) {
      console.error("Failed to export Gist:", error);
    }
  };

  return (
    <button
      className="p-2 m-2 ml-0 bg-blue-500 text-sm text-white rounded"
      onClick={exportGist}
      disabled={!todos || !projectName}
      title={
        !todos || !projectName
          ? "Project name or todos are missing."
          : "Export as Gist"
      }
    >
      Export Gist
    </button>
  );
};

export default ExportGist;
